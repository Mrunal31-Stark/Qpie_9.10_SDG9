import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PatentOverview from './pages/PatentOverview'
import AnalysisDashboard from './pages/AnalysisDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patent/:id" element={<PatentOverview />} />
        <Route path="/analysis/:id" element={<AnalysisDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
