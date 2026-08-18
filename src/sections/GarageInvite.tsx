import React from 'react'
import { Link } from 'react-router-dom'
import { color, motion, useReducedMotion } from 'framer-motion'

const MotionLink = motion(Link)

export default function GarageInvite(){
  const reduce = useReducedMotion()
  return (
    <div className="garage-root" role="region" aria-label="Convite para sua garagem">
      <div>
        <div className="meta">SUA GARAGEM</div>
        <h2 className="garage-title">SEUS CARROS. SUAS HISTÓRIAS. SUA IDENTIDADE.</h2>
        <p className="muted garage-description">Crie sua coleção pessoal e construa sua identidade automotiva.</p>
      </div>
      <div>
        <MotionLink to="/garage" style={{color:'black', width: '220px'}} className="garage-cta motion-link" whileHover={reduce ? {} : { x: 6 }} aria-label="Entrar na garagem">
          ENTRAR NA GARAGEM →
        </MotionLink>
      </div>
    </div>
  )
}
