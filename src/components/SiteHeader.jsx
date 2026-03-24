import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NAV_AUTH, NAV_LINKS } from '../data/landingContent'
import Container from './Container'

function NavLink({ href, children, onClick, className, style }) {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  if (!isInternal) {
    return <a href={href} className={className} style={style} target="_blank" rel="noreferrer">{children}</a>
  }
  return <Link to={href === '#' ? '/' : href} onClick={onClick} className={className} style={style}>{children}</Link>
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          scrolled
            ? 'border-tkm-800/50 bg-tkm-950/95 shadow-xl shadow-tkm-950/30 backdrop-blur-2xl'
            : 'border-tkm-800/30 bg-tkm-950'
        }`}
      >
        <Container className="flex items-center justify-between gap-4 py-2 sm:py-2.5">
          {/* Logo */}
          <Link className="group relative z-50 flex shrink-0 items-center gap-2 no-underline sm:gap-2.5" to="/">
            <img
              src="/images/tkm-logo.png"
              alt="TKM Logo"
              className="h-10 w-10 shrink-0 rounded-full bg-white object-cover shadow-md shadow-tkm-950/20 sm:h-11 sm:w-11"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[0.8rem] font-bold tracking-tight text-white sm:text-[0.9rem]">
                Tamil Katral Maiyam
              </span>
              <span className="font-tamil text-[0.6rem] font-medium text-tkm-300/80 sm:text-[0.65rem]" lang="ta">
                தமிழ் கற்றல் மையம்
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-x-0.5" aria-label="Primary">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-[0.82rem] font-medium text-tkm-200/80 no-underline transition-all duration-200 hover:bg-white/8 hover:text-white whitespace-nowrap"
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden xl:flex shrink-0 items-center gap-2.5">
            {NAV_AUTH.map((item) =>
              item.variant === 'cta' ? (
                <NavLink
                  key={item.label}
                  href={item.href}
                  className="flex items-center rounded-full px-5 py-2 text-[0.82rem] font-bold text-white no-underline shadow-lg shadow-logo-orange/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-logo-orange/30"
                  style={{ background: 'linear-gradient(135deg, #f7941d, #e8363a)' }}
                >
                  {item.label}
                </NavLink>
              ) : (
                <NavLink
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-[0.82rem] font-semibold text-tkm-200/80 no-underline transition-colors hover:text-white"
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-2 relative z-50">
            <Link
              to="/admin-login"
              className="text-[0.8rem] font-bold text-accent-400 no-underline transition-colors hover:text-accent-300"
            >
              Log in
            </Link>
            <button
              type="button"
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg text-white/80 transition-colors hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
            >
              <span className="sr-only">Toggle menu</span>
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-tkm-950/98 backdrop-blur-2xl transition-all duration-500 xl:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col overflow-y-auto overscroll-contain pt-20 pb-10 px-6">
          <nav className="flex w-full flex-col items-center gap-4 text-center my-auto">
            {NAV_LINKS.map((item, idx) => (
              <NavLink
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-xl font-bold text-white/90 transition-all hover:text-accent-400 sm:text-2xl"
                style={{
                  transitionDelay: open ? `${idx * 40 + 80}ms` : '0ms',
                  opacity: open ? 1 : 0,
                  transform: open ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {item.label}
              </NavLink>
            ))}

            <div
              className="mt-6 flex w-full max-w-xs flex-col gap-3 border-t border-tkm-800 pt-6"
              style={{
                transitionDelay: open ? `${NAV_LINKS.length * 40 + 160}ms` : '0ms',
                opacity: open ? 1 : 0,
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {NAV_AUTH.map((item) =>
                item.variant === 'cta' ? (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl py-3.5 text-center font-display text-sm font-bold text-white shadow-lg sm:text-base"
                    style={{ background: 'linear-gradient(135deg, #f7941d, #e8363a)' }}
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl border border-tkm-700 bg-tkm-900/50 py-3 text-center font-display text-sm font-bold text-tkm-200 sm:text-base"
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
