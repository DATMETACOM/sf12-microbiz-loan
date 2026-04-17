import Layout from '../../components/Layout'

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Active Loans</p>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Disbursed</p>
          <p className="text-3xl font-bold">0 VND</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">NPL Rate</p>
          <p className="text-3xl font-bold text-green-600">0%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Avg Credit Score</p>
          <p className="text-3xl font-bold">—</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Portfolio Overview</h2>
        <p className="text-gray-500">Coming soon — real-time portfolio analytics</p>
      </div>
    </Layout>
  )
}
