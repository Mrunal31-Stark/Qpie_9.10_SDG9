import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)
  const [threshold, setThreshold] = useState(80)
  const [domain, setDomain] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [patentText, setPatentText] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [recentAnalyses, setRecentAnalyses] = useState([])

  // Load saved analyses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('patentAnalyses')
    if (saved) {
      setRecentAnalyses(JSON.parse(saved))
    } else {
      // Set initial demo data
      const demoData = [
        {
          id: 'patent-1',
          title: 'EV Battery System',
          date: 'Jan 15, 2026',
          description: 'Thermal management system for electric vehicle batteries',
          domain: 'Electric Vehicles',
          similarity: 72,
          icon: '🔋'
        },
        {
          id: 'patent-2',
          title: 'AI Optimization',
          date: 'Jan 12, 2026',
          description: 'Machine learning model for patent classification',
          domain: 'AI & ML',
          similarity: 45,
          icon: '🤖'
        },
        {
          id: 'patent-3',
          title: 'Solar Tech',
          date: 'Jan 10, 2026',
          description: 'Advanced photovoltaic cell efficiency improvement',
          domain: 'Renewable Energy',
          similarity: 28,
          icon: '☀️'
        }
      ]
      setRecentAnalyses(demoData)
      localStorage.setItem('patentAnalyses', JSON.stringify(demoData))
    }
  }, [])

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file)
      // Read file content (simplified - in production, you'd use a PDF parser)
      const reader = new FileReader()
      reader.onload = (event) => {
        setPatentText(`PDF Uploaded: ${file.name}\nSize: ${(file.size / 1024).toFixed(2)} KB`)
      }
      reader.readAsText(file)
    } else {
      alert('Please upload a PDF file')
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleAnalyze = () => {
    // Validate inputs
    if (!patentText && !uploadedFile && !searchKeyword) {
      alert('Please provide patent text, upload a PDF, or enter a search keyword')
      return
    }

    if (!domain) {
      alert('Please select a technology domain')
      return
    }

    // Generate new analysis
    const newAnalysis = {
      id: `patent-${Date.now()}`,
      title: searchKeyword || uploadedFile?.name || 'Patent Analysis',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: patentText.substring(0, 100) || searchKeyword || 'Uploaded patent document',
      domain: domain,
      similarity: threshold,
      icon: getDomainIcon(domain)
    }

    // Add to recent analyses
    const updated = [newAnalysis, ...recentAnalyses]
    setRecentAnalyses(updated)
    localStorage.setItem('patentAnalyses', JSON.stringify(updated))

    // Navigate to patent overview (you can customize this)
    navigate(`/patent/${newAnalysis.id}`)
  }

  const getDomainIcon = (domainName) => {
    const icons = {
      'Electric Vehicles': '🔋',
      'Battery Technology': '🔋',
      'AI & Machine Learning': '🤖',
      'Renewable Energy': '☀️',
      'Biotechnology': '🧬'
    }
    return icons[domainName] || '📄'
  }

  const getSimilarityColor = (similarity) => {
    if (similarity >= 70) return 'bg-green-100 text-green-700'
    if (similarity >= 40) return 'bg-yellow-100 text-yellow-700'
    return 'bg-blue-100 text-blue-700'
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
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Recent History
            </button>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {localStorage.getItem('token') ? 'U' : 'JD'}
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
                    onClick={() => {
                      localStorage.removeItem('token')
                      navigate('/')
                    }}
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload or Search Patents</h1>
        <p className="text-gray-600 mb-8">Analyze patents for duplication, trends, and innovation insights</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Upload Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upload Patent Document</h2>

            {/* Upload Area */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div
              onClick={handleUploadClick}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">📁</div>
              <button className="text-blue-600 font-bold hover:text-blue-700">
                {uploadedFile ? uploadedFile.name : 'Upload PDF'}
              </button>
              <p className="text-gray-500 text-sm mt-2">or Paste Text Below</p>
            </div>

            {/* Text Area */}
            <textarea
              value={patentText}
              onChange={(e) => setPatentText(e.target.value)}
              placeholder="Paste patent text, abstract, or claims here..."
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Right Column - Search Section */}
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Keyword Search</h2>

            {/* Search Input */}
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder='e.g. "EV battery cooling technology"'
              className="input-field mb-6"
            />

            {/* Similarity Threshold */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Set Similarity Threshold:
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={threshold}
                  onChange={(e) => setThreshold(e.target.value)}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="px-4 py-2 bg-blue-100 text-blue-700 font-bold rounded-lg min-w-fit">
                  {threshold}%
                </div>
              </div>
            </div>

            {/* Technology Domain */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technology Domain:
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="input-field"
              >
                <option value="">Select a domain</option>
                <option>Electric Vehicles</option>
                <option>Battery Technology</option>
                <option>AI & Machine Learning</option>
                <option>Renewable Energy</option>
                <option>Biotechnology</option>
              </select>
            </div>

            {/* Alert Box */}
            {threshold >= 70 && (
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded mb-6">
                <div className="flex gap-2">
                  <span className="text-xl">⚠️</span>
                  <div>
                    <h3 className="font-bold text-orange-900">Alert: High Similarity Detected!</h3>
                    <p className="text-orange-700 text-sm">
                      This invention closely matches existing patents.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleAnalyze}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
          >
            Analyze Patent
          </button>
        </div>

        {/* Recent Analysis */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Analysis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentAnalyses.map((analysis) => (
              <div
                key={analysis.id}
                onClick={() => navigate(`/patent/${analysis.id}`)}
                className="card p-6 cursor-pointer hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{analysis.title}</h3>
                    <p className="text-gray-500 text-sm">{analysis.date}</p>
                  </div>
                  <span className="text-2xl">{analysis.icon}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {analysis.description}
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    {analysis.domain}
                  </span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSimilarityColor(analysis.similarity)}`}>
                    {analysis.similarity}% Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
