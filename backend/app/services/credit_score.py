from __future__ import annotations

from app.services.qwen import score_seller, analyze_cash_flow


def _safe(value: float, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _rule_based_score(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    if not cash_flow_data:
        return {
            "credit_score": 520,
            "risk_level": "high",
            "scoring_breakdown": {},
            "key_factors": [],
            "recommendation": "review",
            "recommended_loan_limit": 5000000,
            "recommended_revenue_percent": 12.0,
            "reason_codes": ["INSUFFICIENT_CASHFLOW_HISTORY"],
        }

    revenues = [_safe(row.get("revenue")) for row in cash_flow_data]
    txs = [_safe(row.get("transactions")) for row in cash_flow_data]
    returns = [_safe(row.get("return_rate")) for row in cash_flow_data]
    platforms = {row.get("platform") for row in cash_flow_data if row.get("platform")}

    avg_revenue = sum(revenues) / len(revenues)
    avg_tx = sum(txs) / len(txs)
    avg_return = sum(returns) / len(returns) if returns else 0.0

    if avg_revenue <= 0:
        consistency = 20
    else:
        variance = sum((x - avg_revenue) ** 2 for x in revenues) / len(revenues)
        cv = (variance**0.5) / avg_revenue
        consistency = max(20, min(100, 100 - cv * 120))

    tx_score = max(20, min(100, avg_tx / 4.0))
    return_score = max(20, min(100, 100 - avg_return * 1000))
    platform_score = 55 + min(3, len(platforms)) * 15
    growth_ratio = (revenues[-1] / revenues[0]) if revenues[0] > 0 else 1
    growth_score = max(20, min(100, 60 + (growth_ratio - 1) * 120))
    activity_score = max(30, min(100, 45 + len(cash_flow_data) * 6))

    weighted = (
        consistency * 0.25
        + tx_score * 0.20
        + return_score * 0.15
        + platform_score * 0.15
        + growth_score * 0.15
        + activity_score * 0.10
    )
    credit_score = int(max(300, min(850, 300 + weighted * 5.5)))

    if credit_score >= 730:
        risk_level = "low"
        recommendation = "approve"
        revenue_percent = 6.0
    elif credit_score >= 640:
        risk_level = "medium"
        recommendation = "approve"
        revenue_percent = 8.0
    elif credit_score >= 560:
        risk_level = "medium_high"
        recommendation = "review"
        revenue_percent = 10.0
    else:
        risk_level = "high"
        recommendation = "review"
        revenue_percent = 12.0

    loan_limit = max(5000000, min(50000000, round(avg_revenue * 1.45, -3)))

    reason_codes: list[str] = []
    if consistency < 55:
        reason_codes.append("REVENUE_VOLATILITY_HIGH")
    if avg_return > 0.07:
        reason_codes.append("REFUND_RATE_ELEVATED")
    if growth_ratio < 0.9:
        reason_codes.append("REVENUE_TREND_DOWN")
    if avg_tx < 110:
        reason_codes.append("LOW_TRANSACTION_VELOCITY")
    if not reason_codes:
        reason_codes.append("CASHFLOW_STABLE")

    return {
        "credit_score": credit_score,
        "risk_level": risk_level,
        "scoring_breakdown": {
            "revenue_consistency": round(consistency, 2),
            "transaction_volume": round(tx_score, 2),
            "refund_risk": round(return_score, 2),
            "platform_diversity": round(platform_score, 2),
            "growth_trajectory": round(growth_score, 2),
            "account_activity": round(activity_score, 2),
        },
        "key_factors": [
            {"code": code, "weight": 1.0 / len(reason_codes), "impact": "high"}
            for code in reason_codes[:3]
        ],
        "recommendation": recommendation,
        "recommended_loan_limit": loan_limit,
        "recommended_revenue_percent": revenue_percent,
        "reason_codes": reason_codes,
    }


async def calculate_credit_score(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    try:
        scoring_result = await score_seller(seller_data, cash_flow_data)
        flow_analysis = await analyze_cash_flow(cash_flow_data)
    except Exception:
        scoring_result = _rule_based_score(seller_data, cash_flow_data)
        flow_analysis = {
            "monthly_revenue_trend": "rule_based",
            "revenue_stability_score": scoring_result["scoring_breakdown"].get(
                "revenue_consistency", 0
            ),
            "growth_potential": "medium",
            "risk_factors": scoring_result.get("reason_codes", []),
            "recommended_loan_limit": scoring_result.get("recommended_loan_limit", 0),
            "recommended_revenue_share_percent": scoring_result.get(
                "recommended_revenue_percent", 10.0
            ),
            "overall_assessment": "Fallback scoring used due to AI provider unavailable",
        }

    return {
        "seller_id": seller_data.get("id"),
        "score": scoring_result.get("credit_score", 0),
        "risk_level": scoring_result.get("risk_level", "unknown"),
        "factors": scoring_result.get("key_factors", []),
        "recommendation": scoring_result.get("recommendation", "review"),
        "loan_limit": scoring_result.get("recommended_loan_limit", 0),
        "max_tenure_months": 12,
        "reason_codes": scoring_result.get("reason_codes", []),
        "scoring_breakdown": scoring_result.get("scoring_breakdown", {}),
        "flow_analysis": flow_analysis,
    }


def calculate_repayment(
    amount: float, revenue_percent: float, monthly_revenue: float
) -> dict:
    monthly_payment = monthly_revenue * (revenue_percent / 100)
    months_to_repay = amount / monthly_payment if monthly_payment > 0 else float("inf")

    return {
        "loan_amount": amount,
        "revenue_share_percent": revenue_percent,
        "estimated_monthly_payment": round(monthly_payment, 0),
        "estimated_months_to_repay": round(months_to_repay, 1),
        "total_estimated_repayment": round(amount * 1.1, 0),
        "note": f"Payment varies with revenue. ~{revenue_percent}% of monthly revenue.",
    }
