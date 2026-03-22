import { FOOTER } from '../data/landingContent'
import Container from './Container'

const FOOTER_LINKS = [
  {
    title: 'PRODUCT',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Modules', href: '#modules' },
      { label: 'Tracking', href: '#analytics' },
    ]
  },
  {
    title: 'MODULES',
    links: [
      { label: 'Explore modules', href: '#modules' },
      { label: 'Vocabulary', href: '#vocabulary' },
    ]
  },
  {
    title: 'TEACHERS',
    links: [
      { label: 'Teacher dashboard', href: '#teachers' },
    ]
  },
  {
    title: 'PARENTS',
    links: [
      { label: 'Safety & Privacy', href: '#safety' },
    ]
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Privacy', href: '#safety' },
    ]
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'Admin Login', href: '#' },
      { label: 'Sign up', href: '#' },
      { label: 'Forgot password', href: '#' },
      { label: 'Contact', href: '#' },
    ]
  }
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-900 py-16 pb-8">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-bottom bg-no-repeat opacity-[0.35] mix-blend-luminosity"
        style={{ backgroundImage: `url('https://tamilschool.ai/images/tkm-hero.jpg.jpeg')` }}
        aria-hidden="true"
      />
      
      {/* Tropical Green/Teal Gradient Overlay to match screenshot vibe */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950 via-teal-900/90 to-emerald-900/90"
        aria-hidden="true"
      />

      <Container className="relative z-10 mx-auto max-w-[85rem]">
        {/* Top Section: CTA + Buttons */}
        <div className="flex flex-col items-center justify-between gap-8 border-b border-white/15 pb-10 md:flex-row md:items-center">
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">Ready to get started?</h2>
            <p className="text-lg font-medium tracking-wide text-emerald-100/90">Log in or request access to your school.</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#"
              className="inline-flex h-[3.2rem] items-center justify-center rounded-[10px] bg-sky-500 px-8 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-400 hover:shadow-sky-500/40"
            >
              Admin Login
            </a>
            <a
              href="#"
              className="inline-flex h-[3.2rem] items-center justify-center rounded-[10px] border-[1.5px] border-white/80 bg-white/5 px-8 text-base font-bold tracking-wide text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-white"
            >
              Request access
            </a>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-12 sm:grid-cols-3 md:grid-cols-6 lg:gap-12">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <h3 className="text-[0.85rem] font-bold tracking-[0.2em] text-emerald-300 uppercase">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3.5 p-0 m-0 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[0.95rem] font-medium text-slate-300 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-6 flex flex-col items-center justify-center border-t border-white/15 pt-8 text-center text-[0.85rem] font-semibold tracking-wide text-slate-400/80">
          <p>© 2026 Tamil Katral Maiyam. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}
