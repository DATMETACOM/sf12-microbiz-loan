import os
import asyncio
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

_client = None


def get_qwen_client() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(
            api_key=os.getenv("DASHSCOPE_API_KEY"),
            base_url="https://dashscope.aliyuncs.com/compatible-mode/v1",
        )
    return _client


def _sync_analyze_cash_flow(cash_flow_data: list[dict]) -> dict:
    client = get_qwen_client()
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

    response = client.chat.completions.create(
        model="qwen-max",
        messages=[
            {
                "role": "system",
                "content": "You are an AI credit analyst specializing in alternative credit scoring for digital economy sellers in Vietnam. Always respond with valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
    )
    return json.loads(response.choices[0].message.content)


async def analyze_cash_flow(cash_flow_data: list[dict]) -> dict:
    return await asyncio.to_thread(_sync_analyze_cash_flow, cash_flow_data)


def _sync_score_seller(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    client = get_qwen_client()
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

    response = client.chat.completions.create(
        model="qwen-max",
        messages=[
            {
                "role": "system",
                "content": "You are an AI credit scoring engine for micro lending to digital economy workers in Vietnam. Be conservative but fair. Always respond with valid JSON.",
            },
            {"role": "user", "content": prompt},
        ],
        response_format={"type": "json_object"},
    )
    return json.loads(response.choices[0].message.content)


async def score_seller(seller_data: dict, cash_flow_data: list[dict]) -> dict:
    return await asyncio.to_thread(_sync_score_seller, seller_data, cash_flow_data)
