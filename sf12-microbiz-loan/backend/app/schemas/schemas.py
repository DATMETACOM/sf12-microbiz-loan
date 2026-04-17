from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SellerBase(BaseModel):
    name: str
    phone: str
    email: str
    seller_type: str
    shop_name: Optional[str] = None
    platform: Optional[str] = None


class SellerResponse(SellerBase):
    id: str
    credit_score: Optional[int] = None
    monthly_revenue_avg: Optional[float] = None
    loan_limit: Optional[float] = None
    registered_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CashFlowBase(BaseModel):
    seller_id: str
    platform: str
    month: str
    revenue: float
    transactions: int
    avg_order_value: Optional[float] = None
    return_rate: Optional[float] = None
    growth_rate: Optional[float] = None


class CashFlowResponse(CashFlowBase):
    id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class LoanApplication(BaseModel):
    seller_id: str
    amount: float
    tenure_months: int
    repayment_type: str = "revenue_percent"
    revenue_percent: Optional[float] = None


class LoanResponse(BaseModel):
    id: str
    seller_id: str
    amount: float
    interest_rate: float
    tenure_months: int
    repayment_type: str
    revenue_percent: Optional[float] = None
    status: str
    ai_score: Optional[float] = None
    ai_risk_factors: Optional[str] = None
    disbursement_date: Optional[datetime] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CreditScoreResponse(BaseModel):
    seller_id: str
    score: int
    risk_level: str
    factors: list[dict]
    recommendation: str
    loan_limit: float
    max_tenure_months: int
