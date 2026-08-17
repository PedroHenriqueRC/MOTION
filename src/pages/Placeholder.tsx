import React from 'react'
import { motion } from 'framer-motion'

type Props = { section: string }

export default function Placeholder({ section }: Props) {
  return (
    <main className="container placeholder-space">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="display-xl">[{section}]</h1>
        <p className="muted placeholder-text">A EXPERIÊNCIA ESTÁ SENDO MONTADA.</p>
      </motion.div>
    </main>
  )
}
