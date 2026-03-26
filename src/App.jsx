import { useEffect, useMemo, useState } from 'react'
import SiteHeader from './components/SiteHeader'
import HeroSection from './components/HeroSection'
import HowItWorksSection from './components/HowItWorksSection'
import ModulesSection from './components/ModulesSection'
import AnalyticsSection from './components/AnalyticsSection'
import TeachersSection from './components/TeachersSection'
import VocabularySection from './components/VocabularySection'
import TestimonialsSection from './components/TestimonialsSection'
import SafetySection from './components/SafetySection'
import SiteFooter from './components/SiteFooter'
import AuthPage from './components/auth/AuthPage'
import RoleDashboard from './components/dashboard/RoleDashboard'
import { getCurrentUser, isAuthed } from './auth/authStorage'

function App() {
  const getRoute = useMemo(() => {
    return () => {
      const hash = window.location.hash || ''
      if (hash.startsWith('#/')) return hash.slice(1) || '/'

      // Backward-compat for your current link.
      if (window.location.pathname === '/admin-login') return '/login'

      return '/'
    }
  }, [])

  const [route, setRoute] = useState(() => getRoute())

  useEffect(() => {
    const onChange = () => setRoute(getRoute())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [getRoute])

  const authed = isAuthed()
  const user = getCurrentUser()

  // If logged in, prefer going straight to the dashboard from home.
  useEffect(() => {
    if (authed && route === '/') {
      window.location.hash = '#/dashboard'
    }
  }, [authed, route])

  if (route === '/login') return <AuthPage mode="login" />
  if (route === '/signup') return <AuthPage mode="signup" />
  if (route === '/forgot-password') return <AuthPage mode="forgot-password" />

  if (route === '/dashboard') return <RoleDashboard user={user} />

  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="grow">
        <HeroSection />
        <HowItWorksSection />
        <ModulesSection />
        <AnalyticsSection />
        <TeachersSection />
        <VocabularySection />
        <TestimonialsSection />
        <SafetySection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
