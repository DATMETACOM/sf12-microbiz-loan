import os, httpx, json
from dotenv import load_dotenv
load_dotenv()

api_key = os.getenv("DASHSCOPE_API_KEY")
print(f"API Key: {api_key[:15]}...")

seller_data = {"id": "SLR0027", "name": "Nguyen Van A", "seller_type": "individual", "platform": "shopee", "monthly_revenue_avg": 45000000}
cash_flow_data = [
    {"month": "2025-10", "revenue": 42000000, "transactions": 145, "return_rate": 2.1, "platform": "shopee"},
    {"month": "2025-11", "revenue": 45000000, "transactions": 152, "return_rate": 1.8, "platform": "shopee"},
    {"month": "2025-12", "revenue": 52000000, "transactions": 178, "return_rate": 1.5, "platform": "shopee"},
    {"month": "2026-01", "revenue": 48000000, "transactions": 160, "return_rate": 2.0, "platform": "shopee"},
    {"month": "2026-02", "revenue": 47000000, "transactions": 155, "return_rate": 1.9, "platform": "shopee"},
    {"month": "2026-03", "revenue": 51000000, "transactions": 170, "return_rate": 1.6, "platform": "shopee"},
]

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
    "model": "qwen3-max",
    "messages": [
        {"role": "system", "content": "You are an AI credit scoring engine for micro lending to digital economy workers in Vietnam. Be conservative but fair. Always respond with valid JSON."},
        {"role": "user", "content": prompt},
    ],
    "max_tokens": 1000,
    "temperature": 0.2,
}

headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}

print("Calling Qwen API...")
try:
    resp = httpx.post("https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions", headers=headers, json=payload, timeout=60.0)
    print("Status:", resp.status_code)
    data = resp.json()
    content = data.get("choices", [{}])[0].get("message", {}).get("content", "{}")
    print("Response:", content[:500])
except Exception as e:
    print("Error:", e)