import React, { useState, useEffect } from 'react'
import { NAV_AUTH, NAV_LINKS } from '../data/landingContent'
import Container from './Container'

function ThemeToggleDecor() {
  return (
    <button
      type="button"
      className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Toggle theme (preview)"
      title="Theme"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <path
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
    </button>
  )
}

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Prevent scrolling on the body when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup incase component unmounts
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-700/40 bg-gradient-to-b from-slate-900 to-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.25)] relative">
        <Container className="flex items-center justify-between py-3">
          
          {/* LOGO */}
          <a className="flex shrink-0 items-center gap-2.5 no-underline hover:opacity-95 z-50 relative" href="#">
            <img 
              src="/images/tkm-logo.png" 
              alt="Tamil Katral Maiyam Logo" 
              className="h-11 w-11 shrink-0 rounded-full bg-white shadow-[0_0_0_2px_rgba(255,255,255,0.15),0_6px_20px_rgba(0,0,0,0.35)] object-cover" 
            />
            <span className="flex flex-col leading-tight">
              <span className="text-base font-extrabold tracking-tight text-white">
                Tamil Katral Maiyam
              </span>
              <span className="font-tamil text-xs font-semibold text-slate-300" lang="ta">
                தமிழ் கற்றல் மையம்
              </span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav
            className="hidden xl:flex flex-1 justify-center gap-x-1 lg:gap-x-3 text-[0.85rem] font-medium"
            aria-label="Primary"
          >
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 lg:px-3 py-2 text-slate-100/90 no-underline transition-colors hover:bg-white/10 hover:text-white whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* DESKTOP AUTH & TOGGLE */}
          <div className="hidden xl:flex shrink-0 items-center gap-2">
            <ThemeToggleDecor />
            {NAV_AUTH.map((item) =>
              item.variant === 'cta' ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full flex items-center bg-blue-600 px-5 h-[2.6rem] text-[0.85rem] font-bold tracking-wide text-white no-underline shadow-[0_4px_16px_rgba(37,99,235,0.45)] transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] hover:no-underline"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 flex items-center h-[2.6rem] text-[0.9rem] font-bold text-sky-400 no-underline transition-colors hover:text-sky-300 hover:no-underline"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex xl:hidden items-center z-50 relative ml-auto">
            {/* Show login button for admin access on mobile, hide the 'request access' to save space */}
            <a
                  href="/admin-login"
                  className="mr-3 text-[0.85rem] font-bold text-sky-400 no-underline transition-colors hover:text-sky-300"
            >
              Log in
            </a>
            <button
              type="button"
              className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg text-slate-200 transition-colors hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Toggle menu</span>
              {/* Custom CSS animated Hamburger Lines */}
              <span className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-6 rounded-full bg-current transition-all duration-300 ease-in-out ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </Container>
      </header>

      {/* MOBILE FULL-SCREEN ANIMATED MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-xl transition-all duration-500 ease-in-out xl:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className={`flex h-full flex-col justify-center px-8 transition-transform duration-500 ease-out ${
            isMobileMenuOpen ? 'translate-y-0 scale-100' : '-translate-y-6 scale-[0.98]'
          }`}
        >
          <nav className="flex w-full flex-col gap-6 text-center">
            {NAV_LINKS.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold tracking-wide text-slate-100 transition-all hover:text-sky-400 hover:scale-105"
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${idx * 50 + 100}ms` : '0ms',
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Mobile Auth Buttons grouped below */}
            <div 
              className="mx-auto mt-6 flex w-full max-w-sm flex-col gap-4 border-t border-slate-700/50 pt-8"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${NAV_LINKS.length * 50 + 200}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {NAV_AUTH.map((item) =>
                item.variant === 'cta' ? (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-[1.1rem] font-bold text-white shadow-lg shadow-blue-500/30 transition-all active:scale-95"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl border-[1.5px] border-slate-600 bg-slate-800/50 py-3.5 text-[1.05rem] font-bold text-sky-400 transition-all active:scale-95"
                  >
                    {item.label}
                  </a>
                ),
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
