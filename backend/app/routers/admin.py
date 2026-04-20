from __future__ import annotations

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import Loan, LoanStatus, Seller

router = APIRouter(prefix="/api/admin", tags=["admin"])


def _status_value(status):
    return status.value if hasattr(status, "value") else status


@router.get("/dashboard")
async def dashboard(db: Session = Depends(get_db)):
    total_sellers = db.query(func.count(Seller.id)).scalar() or 0
    total_loans = db.query(func.count(Loan.id)).scalar() or 0
    active_loans = (
        db.query(func.count(Loan.id)).filter(Loan.status == LoanStatus.ACTIVE).scalar() or 0
    )
    overdue_loans = (
        db.query(func.count(Loan.id)).filter(Loan.status == LoanStatus.OVERDUE).scalar()
        or 0
    )
    total_disbursed = db.query(func.sum(Loan.disbursed_amount)).scalar() or 0
    avg_credit_score = db.query(func.avg(Seller.credit_score)).scalar() or 0
    npl_rate = (overdue_loans / total_loans * 100) if total_loans else 0

    return {
        "total_sellers": int(total_sellers),
        "total_loans": int(total_loans),
        "active_loans": int(active_loans),
        "overdue_loans": int(overdue_loans),
        "total_disbursed": float(round(total_disbursed, 0)),
        "npl_rate": round(npl_rate, 2),
        "avg_credit_score": round(float(avg_credit_score), 1),
    }


@router.get("/portfolio")
async def portfolio(limit: int = 50, db: Session = Depends(get_db)):
    loans = (
        db.query(Loan)
        .order_by(Loan.created_at.desc())
        .limit(min(200, max(1, limit)))
        .all()
    )
    data = [
        {
            "loan_id": loan.id,
            "application_no": loan.application_no,
            "seller_id": loan.seller_id,
            "status": _status_value(loan.status),
            "approved_amount": loan.approved_amount,
            "disbursed_amount": loan.disbursed_amount,
            "outstanding_principal": loan.outstanding_principal,
            "days_past_due": loan.days_past_due,
            "npl_bucket": _status_value(loan.npl_bucket),
            "revenue_percent": loan.revenue_percent,
            "interest_rate": loan.interest_rate,
            "ai_score": loan.ai_score,
        }
        for loan in loans
    ]
    summary = {
        "count": len(data),
        "total_outstanding": float(round(sum(x["outstanding_principal"] for x in data), 0)),
        "total_disbursed": float(round(sum(x["disbursed_amount"] for x in data), 0)),
        "overdue_count": sum(1 for x in data if x["status"] == "overdue"),
    }
    return {"loans": data, "summary": summary}


@router.get("/risk-analytics")
async def risk_analytics(db: Session = Depends(get_db)):
    total_loans = db.query(func.count(Loan.id)).scalar() or 0
    overdue_loans = (
        db.query(func.count(Loan.id)).filter(Loan.status == LoanStatus.OVERDUE).scalar()
        or 0
    )
    npl_rate = (overdue_loans / total_loans * 100) if total_loans else 0

    segments = (
        db.query(Seller.risk_segment, func.count(Seller.id))
        .group_by(Seller.risk_segment)
        .all()
    )
    delinquency_by_segment = {
        (seg.value if hasattr(seg, "value") else str(seg)): int(count)
        for seg, count in segments
    }

    score_distribution = {
        "750_plus": db.query(func.count(Seller.id))
        .filter(Seller.credit_score >= 750)
        .scalar()
        or 0,
        "650_749": db.query(func.count(Seller.id))
        .filter(Seller.credit_score >= 650, Seller.credit_score < 750)
        .scalar()
        or 0,
        "550_649": db.query(func.count(Seller.id))
        .filter(Seller.credit_score >= 550, Seller.credit_score < 650)
        .scalar()
        or 0,
        "below_550": db.query(func.count(Seller.id))
        .filter(Seller.credit_score < 550)
        .scalar()
        or 0,
    }

    return {
        "npl_rate": round(npl_rate, 2),
        "delinquency_by_segment": delinquency_by_segment,
        "score_distribution": score_distribution,
    }
