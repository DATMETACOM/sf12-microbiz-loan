from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.sql import func
from app.database import Base
import enum


class LoanStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    ACTIVE = "active"
    REPAID = "repaid"
    OVERDUE = "overdue"
    REJECTED = "rejected"


class SellerType(str, enum.Enum):
    ECOMMERCE = "ecommerce"
    FREELANCER = "freelancer"
    GIG_WORKER = "gig_worker"


class Platform(str, enum.Enum):
    SHOPEE = "shopee"
    LAZADA = "lazada"
    TIKTOK_SHOP = "tiktok_shop"
    MOMO = "momo"
    ZALOPAY = "zalopay"
    VNPAY = "vnpay"


class KYCStatus(str, enum.Enum):
    PENDING = "pending"
    VERIFIED = "verified"
    REJECTED = "rejected"


class RiskSegment(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    WATCHLIST = "watchlist"


class LoanPurpose(str, enum.Enum):
    INVENTORY = "inventory"
    WORKING_CAPITAL = "working_capital"
    MARKETING = "marketing"
    LOGISTICS = "logistics"
    EQUIPMENT = "equipment"


class NPLBucket(str, enum.Enum):
    CURRENT = "current"
    WATCH = "watch"
    SUBSTANDARD = "substandard"
    DOUBTFUL = "doubtful"
    LOSS = "loss"


class RepaymentStatus(str, enum.Enum):
    PENDING = "pending"
    PARTIAL = "partial"
    PAID = "paid"
    OVERDUE = "overdue"


class Seller(Base):
    __tablename__ = "sellers"

    id = Column(String, primary_key=True)
    customer_no = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    seller_type = Column(Enum(SellerType), nullable=False)
    shop_name = Column(String)
    platform = Column(Enum(Platform))
    business_model = Column(String, nullable=False)
    operating_province = Column(String, nullable=False)
    onboarding_channel = Column(String, nullable=False, default="app")
    kyc_status = Column(Enum(KYCStatus), nullable=False, default=KYCStatus.PENDING)
    kyc_verified_at = Column(DateTime)
    consent_data_sharing = Column(Boolean, nullable=False, default=False)
    consent_timestamp = Column(DateTime)
    cic_available = Column(Boolean, nullable=False, default=False)
    cic_score = Column(Integer)
    risk_segment = Column(Enum(RiskSegment), nullable=False, default=RiskSegment.MEDIUM)
    pd_estimate = Column(Float, nullable=False, default=0.1)
    fraud_score = Column(Float, nullable=False, default=0)
    device_risk_score = Column(Float, nullable=False, default=0)
    registered_at = Column(DateTime, server_default=func.now())
    credit_score = Column(Integer)
    monthly_revenue_avg = Column(Float)
    avg_wallet_inflow_30d = Column(Float)
    avg_wallet_outflow_30d = Column(Float)
    dsr_ratio = Column(Float)
    loan_limit = Column(Float)
    loan_cycle_count = Column(Integer, nullable=False, default=0)
    delinquency_30d = Column(Integer, nullable=False, default=0)
    virtual_account_no = Column(String, unique=True, nullable=False)
    bank_account_masked = Column(String, nullable=False)
    preferred_settlement_channel = Column(String, nullable=False, default="bank_transfer")
    last_active_at = Column(DateTime)


class CashFlow(Base):
    __tablename__ = "cash_flows"

    id = Column(String, primary_key=True)
    seller_id = Column(String, ForeignKey("sellers.id"), nullable=False)
    platform = Column(Enum(Platform), nullable=False)
    month = Column(String, nullable=False)
    gross_merchandise_value = Column(Float, nullable=False)
    net_sales = Column(Float, nullable=False)
    revenue = Column(Float, nullable=False)
    transactions = Column(Integer, nullable=False)
    successful_orders = Column(Integer, nullable=False)
    cancelled_orders = Column(Integer, nullable=False)
    avg_order_value = Column(Float)
    return_rate = Column(Float)
    refund_amount = Column(Float, nullable=False, default=0)
    chargeback_amount = Column(Float, nullable=False, default=0)
    wallet_inflow = Column(Float, nullable=False, default=0)
    wallet_outflow = Column(Float, nullable=False, default=0)
    cod_inflow = Column(Float, nullable=False, default=0)
    platform_fee = Column(Float, nullable=False, default=0)
    marketing_spend = Column(Float, nullable=False, default=0)
    growth_rate = Column(Float)
    seasonality_index = Column(Float, nullable=False, default=1)
    anomaly_score = Column(Float, nullable=False, default=0)
    payout_to_va = Column(Float, nullable=False, default=0)
    created_at = Column(DateTime, server_default=func.now())


class Loan(Base):
    __tablename__ = "loans"

    id = Column(String, primary_key=True)
    application_no = Column(String, unique=True, nullable=False)
    seller_id = Column(String, ForeignKey("sellers.id"), nullable=False)
    purpose = Column(Enum(LoanPurpose), nullable=False, default=LoanPurpose.WORKING_CAPITAL)
    requested_amount = Column(Float, nullable=False)
    approved_amount = Column(Float, nullable=False)
    amount = Column(Float, nullable=False)
    disbursed_amount = Column(Float, nullable=False, default=0)
    outstanding_principal = Column(Float, nullable=False, default=0)
    amount_repaid = Column(Float, nullable=False, default=0)
    interest_rate = Column(Float, nullable=False)
    apr_percent = Column(Float, nullable=False)
    origination_fee = Column(Float, nullable=False, default=0)
    tenure_months = Column(Integer, nullable=False)
    repayment_type = Column(String, default="revenue_percent")
    revenue_percent = Column(Float)
    cap_rate_annual = Column(Float, nullable=False, default=0.2)
    cap_total_payable = Column(Float, nullable=False)
    status = Column(Enum(LoanStatus), default=LoanStatus.PENDING)
    ai_score = Column(Float)
    ai_risk_factors = Column(Text)
    reason_codes = Column(Text)
    days_past_due = Column(Integer, nullable=False, default=0)
    npl_bucket = Column(Enum(NPLBucket), nullable=False, default=NPLBucket.CURRENT)
    disbursement_date = Column(DateTime)
    maturity_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Repayment(Base):
    __tablename__ = "repayments"

    id = Column(String, primary_key=True)
    loan_id = Column(String, ForeignKey("loans.id"), nullable=False)
    due_date = Column(DateTime, nullable=False)
    collection_date = Column(DateTime)
    amount_due = Column(Float, nullable=False)
    amount_paid = Column(Float, default=0)
    principal_component = Column(Float, nullable=False, default=0)
    interest_component = Column(Float, nullable=False, default=0)
    fee_component = Column(Float, nullable=False, default=0)
    revenue_share_percent = Column(Float)
    actual_revenue = Column(Float)
    status = Column(Enum(RepaymentStatus), default=RepaymentStatus.PENDING)
    collection_channel = Column(String, nullable=False, default="virtual_account")
    source_txn_ref = Column(String, unique=True)
    idempotency_key = Column(String, unique=True)
    remaining_principal = Column(Float, nullable=False, default=0)
    paid_at = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
