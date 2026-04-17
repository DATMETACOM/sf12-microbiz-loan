export interface Seller {
  id: string
  name: string
  phone: string
  email: string
  seller_type: "ecommerce" | "freelancer" | "gig_worker"
  shop_name: string
  platform: string
  credit_score: number
  monthly_revenue_avg: number
  loan_limit?: number
}

export interface CashFlow {
  seller_id: string
  platform: string
  month: string
  revenue: number
  transactions: number
  avg_order_value: number
  return_rate: number
  growth_rate: number
}

export interface ScoringFactor {
  name: string
  weight: number
  score: number
  maxScore: number
  detail: string
}

export const sellers: Seller[] = [
  { id: "SLR0001", name: "Nguyễn Văn An", phone: "0934271420", email: "seller1@example.com", seller_type: "ecommerce", shop_name: "An Fashion Store", platform: "shopee", credit_score: 785, monthly_revenue_avg: 16573342, loan_limit: 45000000 },
  { id: "SLR0002", name: "Trần Thị Bích", phone: "0946716043", email: "seller2@example.com", seller_type: "ecommerce", shop_name: "Bích Cosmetics", platform: "lazada", credit_score: 699, monthly_revenue_avg: 28536413, loan_limit: 35000000 },
  { id: "SLR0003", name: "Lê Hoàng Cường", phone: "0935745153", email: "seller3@example.com", seller_type: "gig_worker", shop_name: "Cường Delivery", platform: "momo", credit_score: 454, monthly_revenue_avg: 9742221, loan_limit: 10000000 },
  { id: "SLR0004", name: "Phạm Minh Đức", phone: "0962222998", email: "seller4@example.com", seller_type: "freelancer", shop_name: "Dức Design Studio", platform: "zalopay", credit_score: 629, monthly_revenue_avg: 20295175, loan_limit: 30000000 },
  { id: "SLR0005", name: "Hoàng Thị Emma", phone: "0972177633", email: "seller5@example.com", seller_type: "freelancer", shop_name: "Emma Handmade", platform: "tiktok_shop", credit_score: 457, monthly_revenue_avg: 67232803, loan_limit: 12000000 },
  { id: "SLR0006", name: "Võ Thanh Phước", phone: "0959917233", email: "seller6@example.com", seller_type: "ecommerce", shop_name: "Phước Electronics", platform: "shopee", credit_score: 624, monthly_revenue_avg: 12217638, loan_limit: 28000000 },
  { id: "SLR0007", name: "Bùi Quốc Gia", phone: "0981545332", email: "seller7@example.com", seller_type: "gig_worker", shop_name: "Gia Bike Service", platform: "momo", credit_score: 580, monthly_revenue_avg: 18426706, loan_limit: 20000000 },
  { id: "SLR0008", name: "Đặng Thị Hoa", phone: "0940219977", email: "seller8@example.com", seller_type: "gig_worker", shop_name: "Hoa Food & Drink", platform: "shopee", credit_score: 702, monthly_revenue_avg: 15529218, loan_limit: 35000000 },
  { id: "SLR0009", name: "Ngô Văn Khoa", phone: "0991746096", email: "seller9@example.com", seller_type: "gig_worker", shop_name: "Khoa Express", platform: "zalopay", credit_score: 727, monthly_revenue_avg: 40392825, loan_limit: 40000000 },
  { id: "SLR0010", name: "Lý Thị Lan", phone: "0960741859", email: "seller10@example.com", seller_type: "ecommerce", shop_name: "Lan Beauty Shop", platform: "tiktok_shop", credit_score: 665, monthly_revenue_avg: 42013030, loan_limit: 32000000 },
  { id: "SLR0011", name: "Cao Minh Mạnh", phone: "0975392212", email: "seller11@example.com", seller_type: "freelancer", shop_name: "Mạnh IT Solutions", platform: "momo", credit_score: 783, monthly_revenue_avg: 64769989, loan_limit: 50000000 },
  { id: "SLR0012", name: "Trương Quốc Nguyên", phone: "0986728163", email: "seller12@example.com", seller_type: "freelancer", shop_name: "Nguyên Photo Art", platform: "lazada", credit_score: 746, monthly_revenue_avg: 15242880, loan_limit: 42000000 },
]

const months = ["2025-11", "2025-12", "2026-01", "2026-02", "2026-03", "2026-04"]

function genCashflow(seller: Seller): CashFlow[] {
  const base = seller.monthly_revenue_avg
  return months.map((month, i) => {
    const growth = 1 + (i * 0.03) + (Math.random() * 0.15 - 0.05)
    const revenue = Math.round(base * growth)
    const transactions = Math.round(40 + revenue / 100000)
    return {
      seller_id: seller.id,
      platform: seller.platform,
      month,
      revenue,
      transactions,
      avg_order_value: Math.round(revenue / transactions),
      return_rate: Math.round((1 + Math.random() * 5) * 100) / 100,
      growth_rate: Math.round((i === 0 ? 0.05 : (Math.random() * 0.3 - 0.05)) * 1000) / 1000,
    }
  })
}

export const cashflows: Record<string, CashFlow[]> = {}
sellers.forEach((s) => {
  cashflows[s.id] = genCashflow(s)
})

export function getScoringFactors(seller: Seller, cf: CashFlow[]): ScoringFactor[] {
  const avgRevenue = cf.reduce((s, c) => s + c.revenue, 0) / cf.length
  const revVariance = cf.reduce((s, c) => s + Math.pow(c.revenue - avgRevenue, 2), 0) / cf.length
  const consistencyScore = Math.min(100, Math.max(20, 100 - (Math.sqrt(revVariance) / avgRevenue) * 200))
  const avgTx = cf.reduce((s, c) => s + c.transactions, 0) / cf.length
  const txScore = Math.min(100, avgTx / 3)
  const avgReturn = cf.reduce((s, c) => s + c.return_rate, 0) / cf.length
  const returnScore = Math.max(20, 100 - avgReturn * 12)
  const growthScore = Math.min(100, Math.max(20, (cf[cf.length - 1].revenue / cf[0].revenue - 0.8) * 200))

  return [
    { name: "Ổn định doanh thu", weight: 25, score: Math.round(consistencyScore), maxScore: 100, detail: `Doanh thu TB: ${formatVND(avgRevenue)}/tháng` },
    { name: "Khối lượng giao dịch", weight: 20, score: Math.round(txScore), maxScore: 100, detail: `TB ${Math.round(avgTx)} giao dịch/tháng` },
    { name: "Tỷ lệ hoàn hàng", weight: 15, score: Math.round(returnScore), maxScore: 100, detail: `Tỷ lệ hoàn: ${avgReturn.toFixed(1)}%` },
    { name: "Đa nền tảng", weight: 15, score: seller.platform === "shopee" ? 70 : seller.platform === "lazada" ? 65 : 55, maxScore: 100, detail: `Nền tảng: ${seller.platform}` },
    { name: "Tăng trưởng", weight: 15, score: Math.round(growthScore), maxScore: 100, detail: `Tăng trưởng 6 tháng: ${((cf[cf.length - 1].revenue / cf[0].revenue - 1) * 100).toFixed(1)}%` },
    { name: "Lịch sử hoạt động", weight: 10, score: 75, maxScore: 100, detail: "Hoạt động 6+ tháng" },
  ]
}

export function generateLoans() {
  const statuses = ["active", "active", "active", "active", "repaid", "active", "pending", "active", "active", "overdue", "active", "active"]
  return sellers.slice(0, 12).map((s, i) => ({
    id: `LOAN${String(i + 1).padStart(4, "0")}`,
    seller_id: s.id,
    seller_name: s.name,
    shop_name: s.shop_name,
    amount: Math.round((5 + Math.random() * 45) * 1e6),
    interest_rate: 18 + Math.random() * 6,
    tenure_months: [3, 6, 9, 12][Math.floor(Math.random() * 4)],
    revenue_percent: 6 + Math.random() * 6,
    status: statuses[i],
    ai_score: s.credit_score,
    disbursement_date: `2026-${String(Math.floor(Math.random() * 3) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
  }))
}

export const loans = generateLoans()

export function getRiskColor(score: number): string {
  if (score >= 750) return "text-green-600"
  if (score >= 650) return "text-blue-600"
  if (score >= 550) return "text-yellow-600"
  return "text-red-600"
}

export function getRiskLabel(score: number): string {
  if (score >= 750) return "Rất thấp"
  if (score >= 650) return "Thấp"
  if (score >= 550) return "Trung bình"
  return "Cao"
}

export function getRiskBg(score: number): string {
  if (score >= 750) return "bg-green-100 text-green-800"
  if (score >= 650) return "bg-blue-100 text-blue-800"
  if (score >= 550) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

export function formatVND(n: number): string {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`
  return n.toString()
}

export function formatVNDFull(n: number): string {
  return new Intl.NumberFormat("vi-VN").format(Math.round(n)) + " ₫"
}

export const platformLabels: Record<string, string> = {
  shopee: "Shopee",
  lazada: "Lazada",
  tiktok_shop: "TikTok Shop",
  momo: "MoMo",
  zalopay: "ZaloPay",
  vnpay: "VNPay",
}

export const typeLabels: Record<string, string> = {
  ecommerce: "Seller E-commerce",
  freelancer: "Freelancer",
  gig_worker: "Gig Worker",
}
