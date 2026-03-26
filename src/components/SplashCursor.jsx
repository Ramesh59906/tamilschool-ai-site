import { useEffect, useRef, useState } from 'react'

export default function SplashCursor() {
  const [enabled, setEnabled] = useState(false)
  const [pressed, setPressed] = useState(false)
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const dotPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ringPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const glowPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const rafRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const updateEnabledState = () => {
      setEnabled(mediaQuery.matches && !reducedMotion.matches)
    }

    updateEnabledState()

    mediaQuery.addEventListener('change', updateEnabledState)
    reducedMotion.addEventListener('change', updateEnabledState)

    return () => {
      mediaQuery.removeEventListener('change', updateEnabledState)
      reducedMotion.removeEventListener('change', updateEnabledState)
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      setPressed(false)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return undefined
    }

    const step = () => {
      glowPos.current.x += (targetPos.current.x - glowPos.current.x) * 0.14
      glowPos.current.y += (targetPos.current.y - glowPos.current.y) * 0.14
      ringPos.current.x += (targetPos.current.x - ringPos.current.x) * 0.22
      ringPos.current.y += (targetPos.current.y - ringPos.current.y) * 0.22
      dotPos.current.x += (targetPos.current.x - dotPos.current.x) * 0.35
      dotPos.current.y += (targetPos.current.y - dotPos.current.y) * 0.35

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`
      }

      rafRef.current = requestAnimationFrame(step)
    }

    const handlePointerMove = (event) => {
      targetPos.current.x = event.clientX
      targetPos.current.y = event.clientY
    }

    const handlePointerDown = () => setPressed(true)
    const handlePointerUp = () => setPressed(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    window.addEventListener('pointercancel', handlePointerUp, { passive: true })

    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div className={`splash-cursor${pressed ? ' is-pressed' : ''}`} aria-hidden="true">
      <div ref={glowRef} className="splash-cursor__glow" />
      <div ref={ringRef} className="splash-cursor__ring">
        <div className="splash-cursor__ring-pulse" />
      </div>
      <div ref={dotRef} className="splash-cursor__dot" />
    </div>
  )
}
