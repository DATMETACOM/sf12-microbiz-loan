from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import CashFlow, Seller, SellerType

router = APIRouter(prefix="/api/sellers", tags=["sellers"])


def _enum_value(v):
    return v.value if hasattr(v, "value") else v


def _seller_to_dict(seller: Seller) -> dict:
    return {
        "id": seller.id,
        "customer_no": seller.customer_no,
        "name": seller.name,
        "phone": seller.phone,
        "email": seller.email,
        "seller_type": _enum_value(seller.seller_type),
        "shop_name": seller.shop_name,
        "platform": _enum_value(seller.platform),
        "business_model": seller.business_model,
        "operating_province": seller.operating_province,
        "onboarding_channel": seller.onboarding_channel,
        "kyc_status": _enum_value(seller.kyc_status),
        "consent_data_sharing": seller.consent_data_sharing,
        "cic_available": seller.cic_available,
        "cic_score": seller.cic_score,
        "credit_score": seller.credit_score,
        "risk_segment": _enum_value(seller.risk_segment),
        "pd_estimate": seller.pd_estimate,
        "fraud_score": seller.fraud_score,
        "device_risk_score": seller.device_risk_score,
        "monthly_revenue_avg": seller.monthly_revenue_avg,
        "avg_wallet_inflow_30d": seller.avg_wallet_inflow_30d,
        "avg_wallet_outflow_30d": seller.avg_wallet_outflow_30d,
        "dsr_ratio": seller.dsr_ratio,
        "loan_limit": seller.loan_limit,
        "loan_cycle_count": seller.loan_cycle_count,
        "delinquency_30d": seller.delinquency_30d,
        "virtual_account_no": seller.virtual_account_no,
        "bank_account_masked": seller.bank_account_masked,
        "preferred_settlement_channel": seller.preferred_settlement_channel,
        "registered_at": seller.registered_at.isoformat() if seller.registered_at else None,
        "last_active_at": seller.last_active_at.isoformat() if seller.last_active_at else None,
    }


def _cashflow_to_dict(cashflow: CashFlow) -> dict:
    return {
        "id": cashflow.id,
        "seller_id": cashflow.seller_id,
        "platform": _enum_value(cashflow.platform),
        "month": cashflow.month,
        "gross_merchandise_value": cashflow.gross_merchandise_value,
        "net_sales": cashflow.net_sales,
        "revenue": cashflow.revenue,
        "transactions": cashflow.transactions,
        "successful_orders": cashflow.successful_orders,
        "cancelled_orders": cashflow.cancelled_orders,
        "avg_order_value": cashflow.avg_order_value,
        "return_rate": cashflow.return_rate,
        "refund_amount": cashflow.refund_amount,
        "chargeback_amount": cashflow.chargeback_amount,
        "wallet_inflow": cashflow.wallet_inflow,
        "wallet_outflow": cashflow.wallet_outflow,
        "cod_inflow": cashflow.cod_inflow,
        "platform_fee": cashflow.platform_fee,
        "marketing_spend": cashflow.marketing_spend,
        "growth_rate": cashflow.growth_rate,
        "seasonality_index": cashflow.seasonality_index,
        "anomaly_score": cashflow.anomaly_score,
        "payout_to_va": cashflow.payout_to_va,
        "created_at": cashflow.created_at.isoformat() if cashflow.created_at else None,
    }


@router.get("/")
async def list_sellers(
    limit: int = 50,
    offset: int = 0,
    seller_type: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Seller)
    if seller_type:
        try:
            query = query.filter(Seller.seller_type == SellerType(seller_type))
        except ValueError:
            return {"sellers": [], "total": 0}

    total = query.count()
    sellers = (
        query.order_by(Seller.registered_at.desc())
        .offset(max(0, offset))
        .limit(min(200, max(1, limit)))
        .all()
    )
    return {"sellers": [_seller_to_dict(s) for s in sellers], "total": total}


@router.get("/{seller_id}")
async def get_seller(seller_id: str, db: Session = Depends(get_db)):
    seller = db.query(Seller).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")
    return _seller_to_dict(seller)


@router.get("/{seller_id}/cashflow")
async def get_seller_cashflow(
    seller_id: str, months: int = 6, db: Session = Depends(get_db)
):
    seller = db.query(Seller.id).filter(Seller.id == seller_id).first()
    if not seller:
        raise HTTPException(status_code=404, detail="Seller not found")

    rows = (
        db.query(CashFlow)
        .filter(CashFlow.seller_id == seller_id)
        .order_by(CashFlow.month.desc())
        .limit(min(18, max(1, months)))
        .all()
    )
    rows = list(reversed(rows))

    if not rows:
        return {
            "seller_id": seller_id,
            "cash_flows": [],
            "summary": {"avg_monthly_revenue": 0, "trend": "flat", "stability_score": 0},
        }

    avg_rev = sum(r.revenue for r in rows) / len(rows)
    first_rev = rows[0].revenue
    last_rev = rows[-1].revenue
    trend = "flat"
    if first_rev > 0:
        growth = (last_rev / first_rev) - 1
        if growth >= 0.05:
            trend = "growing"
        elif growth <= -0.05:
            trend = "declining"

    variance = sum((r.revenue - avg_rev) ** 2 for r in rows) / len(rows)
    cv = (variance**0.5) / avg_rev if avg_rev > 0 else 1.0
    stability_score = max(5, min(98, round(100 - cv * 110)))

    avg_anomaly = db.query(func.avg(CashFlow.anomaly_score)).filter(
        CashFlow.seller_id == seller_id
    )
    anomaly_score = float(avg_anomaly.scalar() or 0)

    return {
        "seller_id": seller_id,
        "cash_flows": [_cashflow_to_dict(r) for r in rows],
        "summary": {
            "avg_monthly_revenue": round(avg_rev, 0),
            "trend": trend,
            "stability_score": stability_score,
            "avg_anomaly_score": round(anomaly_score, 2),
        },
    }
