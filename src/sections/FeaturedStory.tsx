import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Story } from '../data/models'

const MotionLink = motion(Link)

export default function FeaturedStory({ story }: { story?: Story }){
  const reduce = useReducedMotion()
  if (!story) return null
  return (
    <article className="story-spread" aria-label="História em destaque">
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="story-media">
        <img src={story.image} alt={story.title} className="story-image" loading="lazy" />
      </motion.div>

      <div>
        <div className="story-category">{story.category}</div>
        <h2 className="story-title">{story.title}</h2>
        <p className="muted story-description">{story.excerpt}</p>
        <MotionLink
          to={`/stories/${story.slug}`}
          className="story-cta motion-link"
          whileHover={reduce ? {} : { x: 8 }}
          aria-label={`Ler ${story.title}`}
        >
          LER →
        </MotionLink>
      </div>
    </article>
  )
}
