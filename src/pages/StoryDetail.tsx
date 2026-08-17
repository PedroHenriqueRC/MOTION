import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryBySlug } from '../data/repo'
import type { Story } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

export default function StoryDetail(){
  const { slug } = useParams()
  const [story, setStory] = React.useState<Story | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()

  async function load(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      if (!slug) {
        if (!mountedRef.current) return
        setStory(undefined)
      } else {
        const res = await getStoryBySlug(slug)
        if (!mountedRef.current) return
        setStory(res)
      }
    } catch (err) {
      if (!mountedRef.current) return
      setError(true)
    } finally {
      if (!mountedRef.current) return
      setLoading(false)
    }
  }

  React.useEffect(() => {
    mountedRef.current = true
    load()
    return () => { mountedRef.current = false }
  }, [slug])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { load() }} />
  if (!story) return <EmptyState message="História não encontrada." />

  return (
    <main className="container section-space-large" aria-label={story.title}>
      <div className="story-back">
        <Link to="/stories" className="meta motion-link">← VOLTAR PARA HISTÓRIAS</Link>
      </div>

      <article className="story-spread" aria-label="Detalhe da história">
        <motion.div className="story-media" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.6 }}>
          <img src={story.image} alt={story.title} className="story-image" loading="lazy" />
        </motion.div>

        <div>
          <div className="story-category">{story.category}</div>
          <h2 className="story-title">{story.title}</h2>
          {story.excerpt ? <p className="muted story-description">{story.excerpt}</p> : null}
        </div>
      </article>
    </main>
  )
}
