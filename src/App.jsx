import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import HomePage from './pages/HomePage'
import AdminLoginPage from './pages/AdminLoginPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import DashboardPage from './pages/DashboardPage'
import UserLoginPage from './pages/UserLoginPage'
import StudentHomePage from './pages/StudentHomePage'
import ConversationModulePage from './pages/ConversationModulePage'
import LearningProgressPage from './pages/LearningProgressPage'
import PlaceholderModulePage from './pages/PlaceholderModulePage'

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/learn" element={<StudentHomePage />} />
        <Route path="/learn/conversation" element={<ConversationModulePage />} />
        <Route path="/learn/progress" element={<LearningProgressPage />} />
        <Route path="/learn/:moduleId" element={<PlaceholderModulePage />} />
      </Routes>
    </>
  )
}
