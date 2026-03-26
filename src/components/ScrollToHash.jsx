import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      // Only scroll to "section" hashes like `#analytics`.
      // Ignore router-like hashes like `#/login` which are not valid CSS selectors.
      if (!hash.startsWith('#/')) {
        try {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
            return
          }
        } catch {
          // Ignore invalid selector hashes.
        }
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [hash, pathname])

  return null
}
