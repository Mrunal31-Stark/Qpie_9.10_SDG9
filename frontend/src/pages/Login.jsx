import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
    const payload = isLogin ? { email, password } : { username, email, password }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.msg || 'Authentication failed')
      }

      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">📋</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            {isLogin ? 'Log In' : 'Create Account'}
          </h1>
          <p className="text-gray-500 text-center mb-8">
            {isLogin ? 'Sign in to your AI Patent Analyzer account' : 'Get started with AI Patent Analyzer'}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            {/* Username Field (Register only) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johndoe"
                  className="input-field"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input-field"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Checkbox and Link (Login only) */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg mt-8 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
            </button>
          </form>

          {/* Toggle Link */}
          <p className="text-center text-gray-600 mt-8">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
              className="text-blue-600 font-bold hover:text-blue-700"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-blue-100 font-semibold transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}
