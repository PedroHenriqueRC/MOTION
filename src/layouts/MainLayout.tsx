import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navigation from '../components/navigation/Navigation'
import Footer from '../components/ui/Footer'
import { motion, AnimatePresence } from 'framer-motion'

export default function MainLayout() {
  const location = useLocation()

  return (
    <div className="app-root">
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
      <Navigation />
      <main id="main-content" className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
