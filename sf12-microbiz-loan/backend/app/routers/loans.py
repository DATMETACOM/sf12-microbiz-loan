from fastapi import APIRouter, HTTPException
from app.schemas.schemas import LoanApplication, LoanResponse, CreditScoreResponse
from app.services.credit_score import calculate_credit_score, calculate_repayment

router = APIRouter(prefix="/api/loans", tags=["loans"])


@router.post("/apply", response_model=LoanResponse)
async def apply_loan(application: LoanApplication):
    return {
        "id": "loan-001",
        "seller_id": application.seller_id,
        "amount": application.amount,
        "interest_rate": 0.18,
        "tenure_months": application.tenure_months,
        "repayment_type": application.repayment_type,
        "revenue_percent": application.revenue_percent or 10.0,
        "status": "pending",
        "ai_score": None,
        "ai_risk_factors": None,
        "disbursement_date": None,
        "created_at": None,
    }


@router.post("/score/{seller_id}", response_model=CreditScoreResponse)
async def get_credit_score(seller_id: str):
    seller_data = {"id": seller_id, "name": "Demo Seller", "seller_type": "ecommerce"}
    cash_flow_data = [{"month": "2026-01", "revenue": 15000000, "transactions": 120}]

    result = await calculate_credit_score(seller_data, cash_flow_data)
    return result


@router.get("/repayment-simulator")
async def simulate_repayment(
    amount: float = 20000000,
    revenue_percent: float = 10.0,
    monthly_revenue: float = 30000000,
):
    return calculate_repayment(amount, revenue_percent, monthly_revenue)


@router.get("/{loan_id}", response_model=LoanResponse)
async def get_loan(loan_id: str):
    raise HTTPException(status_code=404, detail="Loan not found")


@router.get("/")
async def list_loans():
    return {"loans": [], "total": 0}
