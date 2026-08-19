import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// lightweight inline icons to avoid bundler resolution issues
function IconMenu(props: { width?: number; height?: number }){
  return (
    <svg width={props.width ?? 20} height={props.height ?? 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconX(props: { width?: number; height?: number }){
  return (
    <svg width={props.width ?? 20} height={props.height ?? 20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
import { motion } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { to: '/', label: 'INÍCIO' },
  { to: '/discovery', label: 'DESCOBERTA' },
  { to: '/cars', label: 'CARROS' },
  { to: '/stories', label: 'HISTÓRIAS' },
  { to: '/brands', label: 'MARCAS' },
  { to: '/collections', label: 'COLEÇÕES' },
  { to: '/garage', label: 'GARAGEM' },
  { to: '/plans', label: 'ASSINAR' }
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const auth = (() => { try { return useAuth() } catch { return null } })()
  const location = useLocation()

  // When the route changes, remove focus from any nav link so the
  // click-focused outline/underline effect stops once the new screen loads.
  // We only blur if the currently focused element looks like a nav control
  // to avoid disrupting keyboard users who intentionally focused elsewhere.
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      const active = document.activeElement as HTMLElement | null
      if (!active) return
      const cls = active.className || ''
      if (typeof cls === 'string' && (cls.includes('nav-link') || cls.includes('mobile-nav-link') || cls.includes('nav-toggle'))) {
        active.blur()
      }
    }, 60)
    return () => window.clearTimeout(t)
  }, [location.pathname])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <NavLink to="/" className="nav-logo">MOTION</NavLink>

        <nav className="nav-desktop">
          {(auth && auth.user ? navItems.filter(i => i.to !== '/plans') : navItems).map(i => (
            <NavLink
              key={i.to}
              to={i.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              style={i.label === 'ASSINAR' ? { color: 'var(--color-shine)' } : undefined}
            >
              {i.label}
            </NavLink>
          ))}
          {/* auth area */}
          {auth && auth.user ? (
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginLeft: 12 }}>
              <style>{`
                .nav-user-name::after {
                  content: none !important;
                  display: none !important;
                }
              `}</style>
              <span className="nav-link nav-user-name" style={{ fontWeight: 800, color: 'var(--color-shine)' }}>{auth.user.name}</span>

              <NavLink to="/account" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>MINHA CONTA</NavLink>
              <button onClick={() => auth.logout()} className="nav-link nav-logout">SAIR</button>
            </div>
          ) : (
            <div style={{ display: 'inline-flex', gap: 12, alignItems: 'center', marginLeft: 12 }}>
              <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>ENTRAR</NavLink>
            </div>
          )}
        </nav>

        {/* <div className="nav-meta">CULTURA AUTOMOTIVA</div> */}

          <button onClick={() => setOpen(v => !v)} aria-label={open ? 'Fechar navegação' : 'Abrir navegação'} className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav">
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      <AnimateMobile open={open} onClose={() => setOpen(false)} auth={auth} />
    </header>
  )
}

function AnimateMobile({ open, onClose, auth }: { open: boolean; onClose: () => void; auth: any }) {
  return (
    <motion.div initial={false} animate={{ height: open ? 'auto' : 0 }} className="mobile-nav-wrapper">
        {open && (
        <motion.nav id="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
          <div className="container mobile-nav-inner">
            {(auth && auth.user ? navItems.filter(i => i.to !== '/plans') : navItems).map(i => (
              <NavLink
                key={i.to}
                to={i.to}
                onClick={onClose}
                className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}
                style={i.label === 'ASSINAR' ? { color: 'var(--color-shine)' } : undefined}
              >
                {i.label}
              </NavLink>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.div>
  )
}
