from app.services.qwen import score_seller, analyze_cash_flow


async def calculate_credit_score(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    scoring_result = await score_seller(seller_data, cash_flow_data)
    flow_analysis = await analyze_cash_flow(cash_flow_data)

    return {
        "seller_id": seller_data.get("id"),
        "score": scoring_result.get("credit_score", 0),
        "risk_level": scoring_result.get("risk_level", "unknown"),
        "factors": scoring_result.get("key_factors", []),
        "recommendation": scoring_result.get("recommendation", "review"),
        "loan_limit": scoring_result.get("recommended_loan_limit", 0),
        "max_tenure_months": 12,
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
