import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function AnalysisDashboard() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showMenu, setShowMenu] = useState(false)
    const [analysisData, setAnalysisData] = useState(null)

    useEffect(() => {
        // Load analysis from localStorage
        const saved = localStorage.getItem('patentAnalyses')
        if (saved) {
            const analyses = JSON.parse(saved)
            const found = analyses.find(analysis => analysis.id === id)
            setAnalysisData(found || null)
        }
    }, [id])

    if (!analysisData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⏳</div>
                    <p className="text-gray-600">Loading analysis dashboard...</p>
                </div>
            </div>
        )
    }

    const getSimilarityColor = (similarity) => {
        if (similarity >= 70) return 'text-green-600'
        if (similarity >= 40) return 'text-yellow-600'
        return 'text-blue-600'
    }

    const getSimilarityBg = (similarity) => {
        if (similarity >= 70) return 'bg-green-100'
        if (similarity >= 40) return 'bg-yellow-100'
        return 'bg-blue-100'
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">📊</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Analysis Dashboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            ← Back to Dashboard
                        </button>
                        <button
                            onClick={() => navigate(`/patent/${id}`)}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Patent Details
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    U
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
                {/* Title Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{analysisData.title}</h1>
                    <p className="text-gray-600">Analysis created on {analysisData.date}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Similarity Score */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Similarity Score</h3>
                            <span className="text-3xl">{analysisData.icon}</span>
                        </div>
                        <div className={`text-5xl font-bold ${getSimilarityColor(analysisData.similarity)} mb-2`}>
                            {analysisData.similarity}%
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full ${getSimilarityBg(analysisData.similarity).replace('100', '500')}`}
                                style={{ width: `${analysisData.similarity}%` }}
                            />
                        </div>
                    </div>

                    {/* Domain */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Technology Domain</h3>
                            <span className="text-3xl">🏭</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">{analysisData.domain}</p>
                        <p className="text-gray-600 text-sm">Primary classification</p>
                    </div>

                    {/* Status */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Analysis Status</h3>
                            <span className="text-3xl">✓</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600 mb-2">Complete</p>
                        <p className="text-gray-600 text-sm">Ready for review</p>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{analysisData.description}</p>
                </div>

                {/* Analysis Insights */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Innovation Assessment */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation Assessment</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Novelty</span>
                                    <span className="font-bold text-gray-900">{100 - analysisData.similarity}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${100 - analysisData.similarity}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Prior Art Match</span>
                                    <span className="font-bold text-gray-900">{analysisData.similarity}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${analysisData.similarity}%` }} />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Market Potential</span>
                                    <span className="font-bold text-gray-900">{Math.min(95, 60 + (100 - analysisData.similarity))}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(95, 60 + (100 - analysisData.similarity))}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Key Findings */}
                    <div className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="text-green-500 text-xl">✓</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Domain Classification</p>
                                    <p className="text-gray-600 text-sm">Successfully categorized in {analysisData.domain}</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className={`${getSimilarityColor(analysisData.similarity)} text-xl`}>
                                    {analysisData.similarity >= 70 ? '⚠' : analysisData.similarity >= 40 ? '!' : '✓'}
                                </span>
                                <div>
                                    <p className="font-semibold text-gray-900">Similarity Analysis</p>
                                    <p className="text-gray-600 text-sm">
                                        {analysisData.similarity >= 70
                                            ? 'High similarity detected - review existing patents'
                                            : analysisData.similarity >= 40
                                                ? 'Moderate similarity - some overlap exists'
                                                : 'Low similarity - highly novel concept'}
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 text-xl">📊</span>
                                <div>
                                    <p className="font-semibold text-gray-900">Analysis Complete</p>
                                    <p className="text-gray-600 text-sm">All metrics calculated and ready for review</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-2xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {analysisData.similarity >= 70 ? (
                            <>
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <h4 className="font-bold text-gray-900 mb-2">⚠️ High Similarity Alert</h4>
                                    <p className="text-gray-600 text-sm">
                                        Consider reviewing existing patents in {analysisData.domain} to identify differentiation opportunities.
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-bold text-gray-900 mb-2">🔍 Prior Art Review</h4>
                                    <p className="text-gray-600 text-sm">
                                        Conduct thorough prior art search to ensure patentability.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-bold text-gray-900 mb-2">✅ Good Novelty Score</h4>
                                    <p className="text-gray-600 text-sm">
                                        Your innovation shows strong novelty in {analysisData.domain}.
                                    </p>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-bold text-gray-900 mb-2">🚀 Market Opportunity</h4>
                                    <p className="text-gray-600 text-sm">
                                        Consider filing a patent application to protect this innovation.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center mt-8">
                    <button
                        onClick={() => navigate(`/patent/${id}`)}
                        className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-md"
                    >
                        View Patent Details
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl"
                    >
                        New Analysis
                    </button>
                </div>
            </main>
        </div>
    )
}
