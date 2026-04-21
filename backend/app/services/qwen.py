import os
import asyncio
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

QWEN_API_URL = "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions"
QWEN_MODEL = "qwen3-max"


def _get_headers() -> dict:
    api_key = os.getenv("QWEN_API_KEY") or os.getenv("DASHSCOPE_API_KEY") or ""
    return {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }


def _sync_analyze_cash_flow(cash_flow_data: list[dict]) -> dict:
    prompt = f"""Analyze the following e-commerce/e-wallet cash flow data for a micro loan credit assessment.
Data: {cash_flow_data}

Provide a JSON response with:
- monthly_revenue_trend: analysis of revenue trend
- revenue_stability_score: 0-100 score
- growth_potential: "low", "medium", "high"
- risk_factors: list of identified risk factors
- recommended_loan_limit: suggested maximum loan amount in VND
- recommended_revenue_share_percent: suggested % of revenue for repayment (5-15%)
- overall_assessment: brief summary"""

    payload = {
        "model": QWEN_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI credit analyst specializing in alternative credit scoring for digital economy sellers in Vietnam. Always respond with valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 1000,
        "temperature": 0.2,
    }

    response = httpx.post(QWEN_API_URL, headers=_get_headers(), json=payload, timeout=30.0)
    response.raise_for_status()
    data = response.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "{}")
    return json.loads(content)


async def analyze_cash_flow(cash_flow_data: list[dict]) -> dict:
    return await asyncio.to_thread(_sync_analyze_cash_flow, cash_flow_data)


def _sync_score_seller(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    prompt = f"""Calculate an alternative credit score (300-850) for this digital economy seller.

Seller Profile: {seller_data}
Cash Flow History (6 months): {cash_flow_data}

Scoring factors:
1. Revenue consistency (weight: 25%)
2. Transaction volume trend (weight: 20%)
3. Return/refund rate (weight: 15%)
4. Platform diversity (weight: 15%)
5. Growth trajectory (weight: 15%)
6. Account age & activity (weight: 10%)

Respond with JSON:
- credit_score: integer 300-850
- risk_level: "low", "medium", "high"
- scoring_breakdown: detailed factor scores
- key_factors: top 3 factors influencing the score
- recommendation: "approve", "review", "reject"
- recommended_loan_limit: max amount in VND
- recommended_revenue_percent: repayment % of revenue"""

    payload = {
        "model": QWEN_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI credit scoring engine for micro lending to digital economy workers in Vietnam. Be conservative but fair. Always respond with valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 1000,
        "temperature": 0.2,
    }

    response = httpx.post(QWEN_API_URL, headers=_get_headers(), json=payload, timeout=30.0)
    response.raise_for_status()
    data = response.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "{}")
    return json.loads(content)


async def score_seller(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    return await asyncio.to_thread(_sync_score_seller, seller_data, cash_flow_data)


def _sync_analyze_insights(cash_flow_data: list[dict], seller_data: dict) -> dict:
    revenues = [row.get("revenue", 0) for row in cash_flow_data]
    transactions = [row.get("transactions", 0) for row in cash_flow_data]

    avg_revenue = sum(revenues) / len(revenues) if revenues else 0
    latest_revenue = revenues[-1] if revenues else 0
    growth_rate = ((latest_revenue - revenues[0]) / revenues[0] * 100) if revenues[0] > 0 else 0

    recent_growth = 0
    if len(revenues) >= 3:
        recent_growth = ((revenues[-1] - revenues[-3]) / revenues[-3] * 100) if revenues[-3] > 0 else 0

    prompt = f"""Analyze this seller's business data and provide predictive business insights:

Seller Profile: {seller_data}
Cash Flow Data (last {len(cash_flow_data)} months):
- Revenues: {revenues}
- Transactions: {transactions}
- Average Revenue: {avg_revenue:,.0f} VND
- Latest Revenue: {latest_revenue:,.0f} VND
- Growth Rate: {growth_rate:.1f}%
- Recent 1-month Growth: {recent_growth:.1f}%

Provide JSON with:
- demand_peak_alert: boolean - true if demand is surging
- demand_peak_message: string - specific alert message if peak detected
- stockout_risk: boolean - true if stock may run out based on growth
- stockout_days_estimate: number - estimated days until stockout
- recommended_disbursement: number - recommended loan amount to capitalize on surge
- surge_percentage: number - growth percentage indicating the surge
- seasonality_tip: string - tip about seasonal patterns
- business_tips: array of 3 actionable business improvement tips"""

    payload = {
        "model": QWEN_MODEL,
        "messages": [
            {
                "role": "system",
                "content": "You are an AI business intelligence advisor for digital economy sellers in Vietnam. Provide actionable insights. Always respond with valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        "max_tokens": 1000,
        "temperature": 0.3,
    }

    response = httpx.post(QWEN_API_URL, headers=_get_headers(), json=payload, timeout=30.0)
    response.raise_for_status()
    data = response.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "{}")
    return json.loads(content)


async def analyze_insights(cash_flow_data: list[dict], seller_data: dict) -> dict:
    return await asyncio.to_thread(_sync_analyze_insights, cash_flow_data, seller_data)
