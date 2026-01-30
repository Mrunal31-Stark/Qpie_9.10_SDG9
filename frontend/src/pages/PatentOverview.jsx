import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PatentOverview() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showMenu, setShowMenu] = useState(false)
  const [patentData, setPatentData] = useState(null)

  useEffect(() => {
    // Load analysis from localStorage
    const saved = localStorage.getItem('patentAnalyses')
    if (saved) {
      const analyses = JSON.parse(saved)
      const found = analyses.find(analysis => analysis.id === id)

      if (found) {
        // Map the analysis data to patent format
        setPatentData({
          title: found.title || 'Patent Analysis',
          patentNo: `ANALYSIS-${id}`,
          filed: found.date || new Date().toLocaleDateString(),
          status: 'Analyzed',
          abstract: found.description || 'No description available',
          inventors: ['User Analysis'],
          assignee: 'AI Patent Analyzer',
          publicationDate: found.date || new Date().toLocaleDateString(),
          patentType: found.domain || 'Technology',
          similarity: found.similarity || 0,
          icon: found.icon || '📄',
          topConcepts: [
            found.domain,
            'Innovation Analysis',
            'Patent Search',
            'Technology Domain',
            'Similarity Detection'
          ].filter(Boolean)
        })
      } else {
        // Fallback to default data
        setPatentData({
          title: 'EV Battery Thermal Management System',
          patentNo: 'US2021001234',
          filed: 'Jan 10, 2021',
          status: 'Granted',
          abstract: 'This invention relates to a thermal management system for electric vehicle (EV) batteries designed to optimize battery cooling by using a combination of liquid cooling circuits and phase change materials. The system aims to enhance battery lifespan and performance.',
          inventors: ['Jane Smith', 'John Doe'],
          assignee: 'EVTech Innovations Inc.',
          publicationDate: 'Jul 15, 2021',
          patentType: 'Utility',
          similarity: 72,
          icon: '🔋',
          topConcepts: [
            'Battery Thermal Management',
            'EV Battery Cooling',
            'Phase Change Materials',
            'Liquid Cooling Circuit',
            'Energy Efficiency'
          ]
        })
      }
    }
  }, [id])

  if (!patentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-gray-600">Loading analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">📋</span>
            </div>
            <span className="text-xl font-bold text-gray-900">AI Patent Analyzer</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <span className="text-gray-700 font-semibold">Account</span>
                <span>▼</span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                    Account Settings
                  </a>
                  <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100">
                    Change Password
                  </a>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Patent Overview Section */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          {/* Title and Status */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {patentData.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="text-sm">
                <p className="text-gray-600">Patent No.</p>
                <p className="font-bold text-gray-900">{patentData.patentNo}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Filed</p>
                <p className="font-bold text-gray-900">{patentData.filed}</p>
              </div>
              <div className="text-sm">
                <p className="text-gray-600">Status</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
                  {patentData.status}
                </span>
              </div>
              {patentData.similarity !== undefined && (
                <div className="text-sm">
                  <p className="text-gray-600">Similarity Score</p>
                  <span className={`inline-block px-3 py-1 font-bold rounded-full text-sm ${patentData.similarity >= 70 ? 'bg-green-100 text-green-700' :
                    patentData.similarity >= 40 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                    {patentData.similarity}% Match
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Abstract Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-700 leading-relaxed">
              {patentData.abstract}
            </p>
          </div>

          {/* Key Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Key Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Inventors</p>
                  <p className="font-semibold text-gray-900">{patentData.inventors.join(', ')}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Assignee</p>
                  <p className="font-semibold text-gray-900">{patentData.assignee}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Patent Type</p>
                  <p className="font-semibold text-gray-900">{patentData.patentType}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-4">Important Dates</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Filed Date</p>
                  <p className="font-semibold text-gray-900">{patentData.filed}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Publication Date</p>
                  <p className="font-semibold text-gray-900">{patentData.publicationDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Status</p>
                  <p className="font-semibold text-gray-900">{patentData.status}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Concepts */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Top Concepts</h3>
            <div className="flex flex-wrap gap-2">
              {patentData.topConcepts.map((concept, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View Analysis Dashboard Button */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/analysis/${id}`)}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            View Analysis Dashboard
          </button>
        </div>

        {/* AI Chatbox Section */}
        <section className="mt-12">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Chatbox</h2>

            {/* Chat Area */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 h-64 overflow-y-auto">
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  🤖
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm max-w-xs">
                  <p className="text-gray-900 font-semibold mb-1">AI Chatbox</p>
                  <p className="text-gray-700 text-sm">
                    Hello! I'm your AI assistant. Feel free to ask any questions about your patent analysis, identify similar patents, or find related technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type your question here..."
                className="input-field flex-1"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                ➤
              </button>
            </div>
          </div>
        </section>

        {/* Similar Patents Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Patents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Similar Patent Card 1 */}
            <div className="card p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Battery Cooling Technology</h3>
                  <p className="text-gray-500 text-sm">US Patent No: 2020556789</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Advanced cooling system using liquid and phase change materials
              </p>
              <div className="flex gap-2 items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                </div>
                <span className="font-bold text-green-600">82%</span>
              </div>
            </div>

            {/* Similar Patent Card 2 */}
            <div className="card p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">EV Thermal System</h3>
                  <p className="text-gray-500 text-sm">US Patent No: 2019442156</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Integrated thermal management for electric vehicle batteries
              </p>
              <div className="flex gap-2 items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-3/5"></div>
                </div>
                <span className="font-bold text-yellow-600">65%</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; 2026 AI Patent Analyzer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
