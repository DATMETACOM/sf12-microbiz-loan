const API_BASE = '/api'

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

export const api = {
  sellers: {
    list: () => fetchAPI<{ sellers: any[]; total: number }>('/sellers'),
    get: (id: string) => fetchAPI<any>(`/sellers/${id}`),
    cashflow: (id: string, months = 6) => fetchAPI<any>(`/sellers/${id}/cashflow?months=${months}`),
  },
  loans: {
    apply: (data: any) => fetchAPI<any>('/loans/apply', { method: 'POST', body: JSON.stringify(data) }),
    score: (sellerId: string) => fetchAPI<any>(`/loans/score/${sellerId}`, { method: 'POST' }),
    insights: (sellerId: string) => fetchAPI<any>(`/loans/insights/${sellerId}`),
    simulate: (amount: number, pct: number, revenue: number) =>
      fetchAPI<any>(`/loans/repayment-simulator?amount=${amount}&revenue_percent=${pct}&monthly_revenue=${revenue}`),
    list: () => fetchAPI<{ loans: any[]; total: number }>('/loans'),
    get: (id: string) => fetchAPI<any>(`/loans/${id}`),
  },
  admin: {
    dashboard: () => fetchAPI<any>('/admin/dashboard'),
    portfolio: () => fetchAPI<any>('/admin/portfolio'),
    riskAnalytics: () => fetchAPI<any>('/admin/risk-analytics'),
  },
}
