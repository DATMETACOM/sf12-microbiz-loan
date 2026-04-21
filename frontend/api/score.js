import type { VercelRequest, VercelResponse } from '@vercel/node'

const QWEN_API_URL = 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions'
const QWEN_MODEL = 'qwen3-max'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { seller_id, seller_data, cashflow_data, mode } = req.body

  if (!seller_data || !cashflow_data) {
    return res.status(400).json({ error: 'Missing seller_data or cashflow_data' })
  }

  const apiKey = process.env.DASHSCOPE_API_KEY || process.env.QWEN_API_KEY

  if (!apiKey) {
    return res.status(500).json({ error: 'Qwen API key not configured' })
  }

  try {
    let result = {}

    if (mode === 'scoring') {
      result = await callQwenScoring(seller_data, cashflow_data, apiKey)
    } else if (mode === 'insights') {
      result = await callQwenInsights(seller_data, cashflow_data, apiKey)
    } else {
      const [scoring, insights] = await Promise.all([
        callQwenScoring(seller_data, cashflow_data, apiKey),
        callQwenInsights(seller_data, cashflow_data, apiKey),
      ])
      result = { ...scoring, ...insights }
    }

    return res.status(200).json(result)
  } catch (error: any) {
    console.error('Qwen API error:', error.message)
    return res.status(500).json({ error: 'Failed to call Qwen API', details: error.message })
  }
}

async function callQwenScoring(seller_data: any, cashflow_data: any[], apiKey: string) {
  const prompt = `Calculate an alternative credit score (300-850) for this digital economy seller.

Seller Profile:
- Name: ${seller_data.name}
- Type: ${seller_data.seller_type}
- Platform: ${seller_data.platform}
- Monthly Revenue: ${seller_data.monthly_revenue_avg?.toLocaleString()} VND
- Credit Score: ${seller_data.credit_score}
- Risk Segment: ${seller_data.risk_segment}
- DSR Ratio: ${seller_data.dsr_ratio}
- Loan Cycles: ${seller_data.loan_cycle_count}

Cash Flow History (${cashflow_data.length} months):
${cashflow_data.map((cf: any) => `- ${cf.month}: Revenue ${cf.revenue?.toLocaleString()} VND, Transactions: ${cf.transactions}, Return Rate: ${(cf.return_rate * 100).toFixed(1)}%, Growth: ${(cf.growth_rate * 100).toFixed(1)}%`).join('\n')}

Provide JSON with:
- credit_score: integer 300-850
- risk_level: "low", "medium", "high"
- scoring_breakdown: object with factor scores (revenue_consistency, transaction_trend, return_rate, platform_diversity, growth_trajectory)
- key_factors: array of top 3 risk factors
- recommendation: "approve", "review", "reject"
- recommended_loan_limit: max amount in VND
- recommended_revenue_percent: repayment % of revenue`

  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: QWEN_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an AI credit scoring engine for micro lending to digital economy workers in Vietnam. Be conservative but fair. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Qwen API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || '{}'

  try {
    return JSON.parse(content)
  } catch {
    return { error: 'Failed to parse Qwen response', raw: content }
  }
}

async function callQwenInsights(seller_data: any, cashflow_data: any[], apiKey: string) {
  const revenues = cashflow_data.map((cf: any) => cf.revenue)
  const transactions = cashflow_data.map((cf: any) => cf.transactions)
  const avg_revenue = revenues.reduce((a: number, b: number) => a + b, 0) / revenues.length
  const latest_revenue = revenues[revenues.length - 1]
  const growth_rate = revenues[0] > 0 ? ((latest_revenue - revenues[0]) / revenues[0] * 100) : 0

  const prompt = `Analyze this seller's business data and provide predictive business insights:

Seller: ${seller_data.name} (${seller_data.platform})
Monthly Revenue Average: ${avg_revenue.toLocaleString()} VND
Latest Revenue: ${latest_revenue.toLocaleString()} VND
Growth Rate: ${growth_rate.toFixed(1)}%
Transactions trend: ${transactions.join(' → ')}
DSR Ratio: ${seller_data.dsr_ratio}

Provide JSON with:
- demand_peak_alert: boolean
- demand_peak_message: string message if peak detected
- stockout_risk: boolean
- stockout_days_estimate: number or null
- recommended_disbursement: number (VND)
- surge_percentage: number (growth %)
- seasonality_tip: string tip about seasonal patterns
- business_tips: array of 3 actionable business improvement tips
- risk_alerts: array of key risk warnings
- opportunity_highlights: array of positive signals`

  const response = await fetch(QWEN_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: QWEN_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are an AI business intelligence advisor for digital economy sellers in Vietnam. Provide actionable insights. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.3,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Qwen API error: ${response.status} - ${errorText}`)
  }

  const data = await response.json()
  const content = data.choices?.[0]?.message?.content || '{}'

  try {
    return JSON.parse(content)
  } catch {
    return { error: 'Failed to parse Qwen response', raw: content }
  }
}