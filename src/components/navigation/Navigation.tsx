import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
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

const navItems = [
  { to: '/', label: 'INÍCIO' },
  { to: '/discovery', label: 'DESCOBERTA' },
  { to: '/cars', label: 'CARROS' },
  { to: '/stories', label: 'HISTÓRIAS' },
  { to: '/brands', label: 'MARCAS' },
  { to: '/collections', label: 'COLEÇÕES' },
  { to: '/garage', label: 'GARAGEM' },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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
          {navItems.map(i => (
            <NavLink key={i.to} to={i.to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>{i.label}</NavLink>
          ))}
        </nav>

        {/* <div className="nav-meta">CULTURA AUTOMOTIVA</div> */}

          <button onClick={() => setOpen(v => !v)} aria-label={open ? 'Fechar navegação' : 'Abrir navegação'} className="nav-toggle" aria-expanded={open} aria-controls="mobile-nav">
          {open ? <IconX /> : <IconMenu />}
        </button>
      </div>

      <AnimateMobile open={open} onClose={() => setOpen(false)} />
    </header>
  )
}

function AnimateMobile({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <motion.div initial={false} animate={{ height: open ? 'auto' : 0 }} className="mobile-nav-wrapper">
        {open && (
        <motion.nav id="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.18 }}>
          <div className="container mobile-nav-inner">
            {navItems.map(i => (
              <NavLink key={i.to} to={i.to} onClick={onClose} className={({ isActive }) => (isActive ? 'mobile-nav-link active' : 'mobile-nav-link')}>{i.label}</NavLink>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.div>
  )
}
