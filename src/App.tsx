import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TestPage from './pages/TestPage'
import PrivacyPage from './pages/PrivacyPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  )
}
