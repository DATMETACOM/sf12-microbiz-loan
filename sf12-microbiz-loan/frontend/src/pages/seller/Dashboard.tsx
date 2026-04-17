import Layout from '../../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Credit Score</p>
          <p className="text-3xl font-bold text-blue-600">650</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-3xl font-bold text-green-600">25M VND</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Loan Limit</p>
          <p className="text-3xl font-bold text-purple-600">50M VND</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Revenue-Based Repayment Calculator</h2>
        <p className="text-gray-500">Coming soon — AI-powered repayment simulator</p>
      </div>
    </Layout>
  )
}
