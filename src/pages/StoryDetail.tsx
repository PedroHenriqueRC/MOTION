import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStoryBySlug, getStories } from '../data/repo'
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
          const [res, all] = await Promise.all([getStoryBySlug(slug), getStories()])
          if (!mountedRef.current) return
          setStory(res)
          // store all stories locally for related derivation
          // (keep in a ref to avoid extra renders)
          ;(window as any).__allStories = all
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

  // derive related stories from loaded collection if available (same category first)
  // keep hooks (useMemo) before any early returns so hook order is stable
  const relatedStories: Story[] = React.useMemo(() => {
    const all: Story[] = (window as any).__allStories || []
    if (!all || all.length === 0) return []
    if (!story) return []
    const same = all.filter(s => s.id !== story.id && s.category === story.category)
    if (same.length > 0) return same.slice(0,3)
    return all.filter(s => s.id !== story.id).slice(0,3)
  }, [story])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { load() }} />
  if (!story) return <EmptyState message="História não encontrada." />
  return (
    <main className="container section-space-large" aria-label={story.title}>
      <div className="story-back">
        <Link to="/stories" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>← VOLTAR PARA HISTÓRIAS</Link>
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
      {relatedStories && relatedStories.length > 0 && (
        <section style={{ marginTop: 28 }} aria-label="Continue lendo">
          <h3 className="display">CONTINUE LENDO</h3>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {relatedStories.map(s => (
              <article key={s.id} className="card">
                <Link to={`/stories/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card-media"><img src={s.image} alt={s.title} loading="lazy" /></div>
                  <div className="card-body">
                    <div className="story-category">{s.category}</div>
                    <div className="card-title" style={{color: 'black'}}>{s.title}</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
