import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
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
import SplashCursor from './components/SplashCursor'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 1050,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      once: true,
      offset: 90,
      mirror: false,
    })
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname.startsWith('/dashboard')) {
      document.documentElement.classList.remove('theme-dark')
      return
    }

    const savedTheme = localStorage.getItem('tkm-theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      document.documentElement.classList.toggle('theme-dark', savedTheme === 'dark')
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('theme-dark', prefersDark)
    localStorage.setItem('tkm-theme', prefersDark ? 'dark' : 'light')
  }, [location.pathname])

  return (
    <>
      <SplashCursor />
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
