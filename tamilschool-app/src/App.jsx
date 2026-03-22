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

function App() {
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
