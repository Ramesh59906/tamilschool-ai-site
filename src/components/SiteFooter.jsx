import { Link } from 'react-router-dom'
import Container from './Container'

const FOOTER_LINKS = [
  { title: 'PRODUCT', links: [{ label: 'How it works', href: '/#how-it-works' }, { label: 'Modules', href: '/#modules' }, { label: 'Tracking', href: '/#analytics' }] },
  { title: 'LEARNING', links: [{ label: 'Explore modules', href: '/#modules' }, { label: 'Vocabulary', href: '/#vocabulary' }] },
  { title: 'FOR EDUCATORS', links: [{ label: 'Teacher dashboard', href: '/#teachers' }, { label: 'Safety & Privacy', href: '/#safety' }] },
  { title: 'ACCOUNT', links: [{ label: 'Admin Login', href: '/admin-login' }, { label: 'Sign up', href: '/register' }, { label: 'Forgot password', href: '/forgot-password' }] },
]

export default function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-tkm-950">
      {/* CTA */}
      <div className="relative border-b border-white/8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,114,188,0.12),transparent)]" aria-hidden="true" />
        <Container className="relative z-10 flex flex-col items-center justify-between gap-6 py-10 sm:gap-8 sm:py-16 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="mb-2 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Ready to get started?</h2>
            <p className="text-sm font-medium text-tkm-200/60 sm:text-base">Log in or request access for your school.</p>
          </div>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Link to="/admin-login" className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-2.5 font-display text-[0.85rem] font-bold text-tkm-950 shadow-lg shadow-white/10 transition-all duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-7 sm:py-3 sm:text-[0.9rem]">Admin Login</Link>
            <Link to="/register" className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-2.5 font-display text-[0.85rem] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto sm:px-7 sm:py-3 sm:text-[0.9rem]">Request access</Link>
          </div>
        </Container>
      </div>

      {/* Links */}
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:gap-12">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-5 text-[0.75rem] font-bold tracking-[0.2em] text-accent-400 uppercase">{col.title}</h3>
              <ul className="flex flex-col gap-3 p-0 m-0 list-none">
                {col.links.map((link) => (
                  <li key={link.label}><Link to={link.href} className="text-[0.9rem] font-medium text-tkm-200/50 transition-colors hover:text-white">{link.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Bottom */}
      <div className="border-t border-white/8">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <img src="/images/tkm-logo.png" alt="TKM" className="h-8 w-8 rounded-full bg-white object-cover" />
            <span className="font-display text-sm font-bold text-white/60">Tamil Katral Maiyam</span>
          </div>
          <p className="text-[0.8rem] font-medium text-tkm-200/40">&copy; 2026 TKM &mdash; Tamil Katral Maiyam. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  )
}
