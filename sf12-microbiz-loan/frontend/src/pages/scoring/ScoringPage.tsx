import Layout from '../../components/Layout'

export default function ScoringPage() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">AI Alternative Credit Scoring</h1>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Cash Flow Analysis</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Revenue Trend</span>
              <span className="font-medium text-green-600">+12.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction Volume</span>
              <span className="font-medium">245/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Return Rate</span>
              <span className="font-medium text-yellow-600">3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Platform Diversity</span>
              <span className="font-medium">2 platforms</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Credit Score Result</h2>
          <div className="text-center">
            <p className="text-6xl font-bold text-blue-600">650</p>
            <p className="text-sm text-gray-500 mt-2">Medium Risk</p>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              AI Recommendation: Approve — suggested limit 30M VND, 8% revenue share
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Qwen AI Scoring Engine</h2>
        <p className="text-gray-500">Powered by Qwen AI — alternative credit scoring without CIC dependency</p>
      </div>
    </Layout>
  )
}
