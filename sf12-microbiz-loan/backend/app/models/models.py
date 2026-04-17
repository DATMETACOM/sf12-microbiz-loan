from sqlalchemy import Column, String, Float, Integer, DateTime, Enum, ForeignKey, Text
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


class Seller(Base):
    __tablename__ = "sellers"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    seller_type = Column(Enum(SellerType), nullable=False)
    shop_name = Column(String)
    platform = Column(Enum(Platform))
    registered_at = Column(DateTime, server_default=func.now())
    credit_score = Column(Integer)
    monthly_revenue_avg = Column(Float)
    loan_limit = Column(Float)


class CashFlow(Base):
    __tablename__ = "cash_flows"

    id = Column(String, primary_key=True)
    seller_id = Column(String, ForeignKey("sellers.id"), nullable=False)
    platform = Column(Enum(Platform), nullable=False)
    month = Column(String, nullable=False)
    revenue = Column(Float, nullable=False)
    transactions = Column(Integer, nullable=False)
    avg_order_value = Column(Float)
    return_rate = Column(Float)
    growth_rate = Column(Float)
    created_at = Column(DateTime, server_default=func.now())


class Loan(Base):
    __tablename__ = "loans"

    id = Column(String, primary_key=True)
    seller_id = Column(String, ForeignKey("sellers.id"), nullable=False)
    amount = Column(Float, nullable=False)
    interest_rate = Column(Float, nullable=False)
    tenure_months = Column(Integer, nullable=False)
    repayment_type = Column(String, default="revenue_percent")
    revenue_percent = Column(Float)
    status = Column(Enum(LoanStatus), default=LoanStatus.PENDING)
    ai_score = Column(Float)
    ai_risk_factors = Column(Text)
    disbursement_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class Repayment(Base):
    __tablename__ = "repayments"

    id = Column(String, primary_key=True)
    loan_id = Column(String, ForeignKey("loans.id"), nullable=False)
    due_date = Column(DateTime, nullable=False)
    amount_due = Column(Float, nullable=False)
    amount_paid = Column(Float, default=0)
    revenue_share_percent = Column(Float)
    actual_revenue = Column(Float)
    status = Column(String, default="pending")
    paid_at = Column(DateTime)
