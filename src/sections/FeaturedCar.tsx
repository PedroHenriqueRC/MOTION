import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
const MotionLink = motion(Link)
import type { Car } from '../data/models'

export default function FeaturedCar({ car }: { car?: Car }){
  const reduce = useReducedMotion()
  if (!car) return null
  return (
    <article className="featured-spread" aria-label="Carro em destaque">
      <div>
        <div className="featured-meta">01 / DESTAQUE</div>
        <h2 className="featured-title">{car.brand}</h2>
        <h3 className="featured-subtitle">{car.name} <span className="muted">— {car.year}</span></h3>
        <p className="muted featured-description">{car.description}</p>
        <MotionLink
          to={`/cars/${car.slug}`}
          className="meta featured-cta motion-link"
          whileHover={reduce ? {} : { x: 8 }}
          aria-label={`Explorar ${car.brand} ${car.name}`}
          style={{ fontWeight: "700", fontSize: 14, color: "var(--color-shine)" }}
        >
          EXPLORAR →
        </MotionLink>
      </div>

      <motion.div className="featured-media" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
        <img src={car.image} alt={`${car.brand} ${car.name}`} loading="lazy" />
      </motion.div>
    </article>
  )
}
