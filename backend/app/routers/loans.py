from __future__ import annotations

from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import CashFlow, Loan, LoanPurpose, LoanStatus, RiskSegment, Seller
from app.schemas.schemas import LoanApplication, LoanResponse, CreditScoreResponse, SmartInsightsResponse
from app.services.credit_score import calculate_credit_score, calculate_repayment
from app.services.qwen import analyze_insights

router = APIRouter(prefix="/api/loans", tags=["loans"])


def _enum_value(v):
    return v.value if hasattr(v, "value") else v


def _loan_to_dict(loan: Loan) -> dict:
    return {
        "id": loan.id,
        "application_no": loan.application_no,
        "seller_id": loan.seller_id,
        "purpose": _enum_value(loan.purpose),
        "requested_amount": loan.requested_amount,
        "approved_amount": loan.approved_amount,
        "amount": loan.amount,
        "disbursed_amount": loan.disbursed_amount,
        "outstanding_principal": loan.outstanding_principal,
        "amount_repaid": loan.amount_repaid,
        "interest_rate": loan.interest_rate,
        "apr_percent": loan.apr_percent,
        "origination_fee": loan.origination_fee,
        "tenure_months": loan.tenure_months,
        "repayment_type": loan.repayment_type,
        "revenue_percent": loan.revenue_percent,
        "cap_rate_annual": loan.cap_rate_annual,
        "cap_total_payable": loan.cap_total_payable,
        "status": _enum_value(loan.status),
        "ai_score": loan.ai_score,
        "ai_risk_factors": loan.ai_risk_factors,
        "reason_codes": loan.reason_codes,
        "days_past_due": loan.days_past_due,
        "npl_bucket": _enum_value(loan.npl_bucket),
        "disbursement_date": loan.disbursement_date,
        "maturity_date": loan.maturity_date,
        "created_at": loan.created_at,
    }


def _interest_policy(score: int) -> tuple[float, float]:
    if score >= 730:
        return 0.16, 6.0
    if score >= 650:
        return 0.18, 8.0
    if score >= 560:
        return 0.21, 10.0
    return 0.24, 12.0


@router.post("/apply", response_model=LoanResponse)
async def apply_loan(application: LoanApplication, db: Session = Depends(get_db)):
    seller = db.query(Seller).filter(Seller.id == application.seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    approved_cap = seller.loan_limit or 5000000
    approved_amount = max(5000000, min(application.amount, approved_cap, 50000000))
    interest_rate, default_revenue_percent = _interest_policy(seller.credit_score or 550)
    revenue_percent = application.revenue_percent or default_revenue_percent
    tenure_months = max(3, min(12, application.tenure_months))

    try:
        purpose = LoanPurpose(application.purpose)
    except ValueError:
        purpose = LoanPurpose.WORKING_CAPITAL

    loan = Loan(
        id=f"LOAN{uuid4().hex[:10].upper()}",
        application_no=f"APP{uuid4().hex[:10].upper()}",
        seller_id=application.seller_id,
        purpose=purpose,
        requested_amount=application.amount,
        approved_amount=approved_amount,
        amount=approved_amount,
        disbursed_amount=0,
        outstanding_principal=0,
        amount_repaid=0,
        interest_rate=interest_rate,
        apr_percent=round(interest_rate * 100 + 2.1, 2),
        origination_fee=round(approved_amount * 0.01, 0),
        tenure_months=tenure_months,
        repayment_type=application.repayment_type,
        revenue_percent=revenue_percent,
        cap_rate_annual=0.2,
        cap_total_payable=round(approved_amount * (1 + 0.2 * (tenure_months / 12)), 0),
        status=LoanStatus.PENDING,
        ai_score=seller.credit_score,
        ai_risk_factors="[]",
        reason_codes='["APPLICATION_RECEIVED"]',
    )
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return _loan_to_dict(loan)


@router.post("/score/{seller_id}", response_model=CreditScoreResponse)
async def get_credit_score(seller_id: str, db: Session = Depends(get_db)):
    seller = db.query(Seller).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    cashflow_rows = (
        db.query(CashFlow)
        .filter(CashFlow.seller_id == seller_id)
        .order_by(CashFlow.month.asc())
        .all()
    )
    if not cashflow_rows:
        raise HTTPException(status_code=404, detail="Cashflow history not found")

    seller_data = {
        "id": seller.id,
        "name": seller.name,
        "seller_type": _enum_value(seller.seller_type),
        "platform": _enum_value(seller.platform),
        "monthly_revenue_avg": seller.monthly_revenue_avg,
    }
    cash_flow_data = [
        {
            "month": row.month,
            "revenue": row.revenue,
            "transactions": row.transactions,
            "return_rate": row.return_rate,
            "platform": _enum_value(row.platform),
        }
        for row in cashflow_rows
    ]

    result = await calculate_credit_score(seller_data, cash_flow_data)
    seller.credit_score = result.get("score")
    seller.loan_limit = result.get("loan_limit")
    risk_level = str(result.get("risk_level", "medium")).lower()
    if "low" in risk_level and "high" not in risk_level:
        seller.risk_segment = RiskSegment.LOW
    elif "high" in risk_level:
        seller.risk_segment = RiskSegment.HIGH
    else:
        seller.risk_segment = RiskSegment.MEDIUM
    db.commit()

    return result


@router.get("/insights/{seller_id}", response_model=SmartInsightsResponse)
async def get_smart_insights(seller_id: str, db: Session = Depends(get_db)):
    seller = db.query(Seller).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    cashflow_rows = (
        db.query(CashFlow)
        .filter(CashFlow.seller_id == seller_id)
        .order_by(CashFlow.month.asc())
        .all()
    )
    if not cashflow_rows:
        raise HTTPException(status_code=404, detail="Cashflow history not found")

    seller_data = {
        "id": seller.id,
        "name": seller.name,
        "seller_type": _enum_value(seller.seller_type),
        "platform": _enum_value(seller.platform),
        "monthly_revenue_avg": seller.monthly_revenue_avg,
    }
    cash_flow_data = [
        {
            "month": row.month,
            "revenue": row.revenue,
            "transactions": row.transactions,
            "return_rate": row.return_rate,
            "platform": _enum_value(row.platform),
        }
        for row in cashflow_rows
    ]

    try:
        insights = await analyze_insights(cash_flow_data, seller_data)
    except Exception:
        revenues = [c["revenue"] for c in cash_flow_data]
        growth = ((revenues[-1] - revenues[0]) / revenues[0] * 100) if revenues[0] > 0 else 0
        insights = {
            "demand_peak_alert": growth > 20,
            "demand_peak_message": f"Xu hướng tăng trưởng {growth:.1f}% detected" if growth > 20 else None,
            "stockout_risk": False,
            "stockout_days_estimate": None,
            "recommended_disbursement": int(seller.monthly_revenue_avg * 1.2) if growth > 20 else 0,
            "surge_percentage": growth if growth > 0 else 0,
            "seasonality_tip": "Doanh thu ổn định" if abs(growth) < 10 else "Có biến động doanh thu",
            "business_tips": [
                "Duy trì kết nối API để theo dõi real-time",
                "Giữ tỷ lệ hoàn hàng dưới 3%",
                "Tăng cường marketing trong tháng tới",
            ],
        }

    return {
        "seller_id": seller_id,
        **insights,
    }


@router.get("/repayment-simulator")
async def simulate_repayment(
    amount: float = 20000000,
    revenue_percent: float = 10.0,
    monthly_revenue: float = 30000000,
):
    return calculate_repayment(amount, revenue_percent, monthly_revenue)


@router.get("/{loan_id}", response_model=LoanResponse)
async def get_loan(loan_id: str, db: Session = Depends(get_db)):
    loan = db.query(Loan).filter(Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    return _loan_to_dict(loan)


@router.get("/")
async def list_loans(limit: int = 100, offset: int = 0, db: Session = Depends(get_db)):
    query = db.query(Loan)
    total = query.count()
    loans = (
        query.order_by(Loan.created_at.desc())
        .offset(max(0, offset))
        .limit(min(300, max(1, limit)))
        .all()
    )
    return {"loans": [_loan_to_dict(loan) for loan in loans], "total": total}
