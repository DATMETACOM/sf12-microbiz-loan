from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SellerBase(BaseModel):
    customer_no: str
    name: str
    phone: str
    email: str
    seller_type: str
    shop_name: str
    platform: str
    business_model: str
    operating_province: str
    onboarding_channel: str
    kyc_status: str
    consent_data_sharing: bool
    cic_available: bool
    risk_segment: str
    pd_estimate: float
    fraud_score: float
    device_risk_score: float
    virtual_account_no: str
    bank_account_masked: str


class SellerResponse(SellerBase):
    id: str
    cic_score: Optional[int] = None
    credit_score: Optional[int] = None
    monthly_revenue_avg: Optional[float] = None
    avg_wallet_inflow_30d: Optional[float] = None
    avg_wallet_outflow_30d: Optional[float] = None
    dsr_ratio: Optional[float] = None
    loan_limit: Optional[float] = None
    loan_cycle_count: int = 0
    delinquency_30d: int = 0
    kyc_verified_at: Optional[datetime] = None
    consent_timestamp: Optional[datetime] = None
    registered_at: Optional[datetime] = None
    last_active_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CashFlowBase(BaseModel):
    seller_id: str
    platform: str
    month: str
    gross_merchandise_value: float
    net_sales: float
    revenue: float
    transactions: int
    successful_orders: int
    cancelled_orders: int
    avg_order_value: float
    return_rate: float
    refund_amount: float
    chargeback_amount: float
    wallet_inflow: float
    wallet_outflow: float
    cod_inflow: float
    platform_fee: float
    marketing_spend: float
    growth_rate: float
    seasonality_index: float
    anomaly_score: float
    payout_to_va: float


class CashFlowResponse(CashFlowBase):
    id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class LoanApplication(BaseModel):
    seller_id: str
    amount: float
    tenure_months: int
    purpose: str = "working_capital"
    repayment_type: str = "revenue_percent"
    revenue_percent: Optional[float] = None


class LoanResponse(BaseModel):
    id: str
    application_no: str
    seller_id: str
    purpose: str
    requested_amount: float
    approved_amount: float
    amount: float
    disbursed_amount: float
    outstanding_principal: float
    amount_repaid: float
    interest_rate: float
    apr_percent: float
    origination_fee: float
    tenure_months: int
    repayment_type: str
    revenue_percent: float
    cap_rate_annual: float
    cap_total_payable: float
    status: str
    ai_score: Optional[float] = None
    ai_risk_factors: Optional[str] = None
    reason_codes: Optional[str] = None
    days_past_due: int = 0
    npl_bucket: str = "current"
    disbursement_date: Optional[datetime] = None
    maturity_date: Optional[datetime] = None
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
    reason_codes: Optional[list[str]] = None


class EWAApplication(BaseModel):
    employee_id: str
    amount: float
    reason: Optional[str] = None


class EWAResponse(BaseModel):
    id: str
    employee_id: str
    employee_name: str
    amount: float
    fee: float
    total_deduct: float
    net_amount: float
    status: str
    created_at: datetime
    monthly_limit: float
    current_month_usage: float
    remaining_limit: float
    compliance_note: str
