import React from 'react'
import { Link } from 'react-router-dom'
import { getStories } from '../data/repo'
import type { Story } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'
import FeaturedStory from '../sections/FeaturedStory'

export default function Stories(){
  const [stories, setStories] = React.useState<Story[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()

  async function load(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const res = await getStories()
      if (!mountedRef.current) return
      setStories(res)
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
  }, [])

  // compute memoized values before any early returns so hook order is stable
  const editorPick = React.useMemo(() => {
    if (!stories || stories.length === 0) return undefined
    return stories.reduce((a, b) => ((b.excerpt?.length || 0) > (a.excerpt?.length || 0) ? b : a), stories[0])
  }, [stories])

  const byCategory = React.useMemo(() => {
    const m: Record<string, Story[]> = {}
    stories.forEach(s => { const k = s.category || 'Geral'; if (!m[k]) m[k]=[]; m[k].push(s) })
    return m
  }, [stories])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { load() }} />
  if (!stories || stories.length === 0) return <EmptyState message="Nenhuma história encontrada." />

  const featured = stories[0]
  const latest = stories.slice(1)

  return (
    <main className="container section-space-large" aria-label="Histórias">
      <header className="stories-hero">
        <div className="micro muted">REVISTA AUTOMOTIVA</div>
        <h1 className="display-xl">HISTÓRIAS</h1>
        <p className="muted" style={{ marginTop: 8 }}>Histórias sobre carros, pessoas, cultura e movimento.</p>
        <div style={{ marginTop: 10 }} className="meta">{stories.length.toString().padStart(2,'0')} HISTÓRIAS</div>
      </header>

      {/* Featured story */}
      {featured && (
        <section style={{ marginTop: 24 }} aria-label="Featured story">
          <FeaturedStory story={featured} />
        </section>
      )}

      {/* Editor's pick */}
      {editorPick && (
        <section style={{ marginTop: 24 }} aria-label="Editor's pick">
          <h3 className="display">ESCOLHA DO EDITOR</h3>
          <div style={{ marginTop: 12 }}>
            <article className="card card-body--lg">
              <div className="story-category">{editorPick.category}</div>
              <h3 className="story-title">{editorPick.title}</h3>
              {editorPick.excerpt ? <p className="muted" style={{ marginTop: 8 }}>{editorPick.excerpt}</p> : null}
              <div style={{ marginTop: 10 }}><a href={`/stories/${editorPick.slug}`} className="meta motion-link">LER →</a></div>
            </article>
          </div>
        </section>
      )}

      {/* Latest stories */}
      <section style={{ marginTop: 28 }} aria-label="Latest stories">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">HISTÓRIAS RECENTES</h2>
            <div className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODAS AS HISTÓRIAS →</div>
          </div>

        <div style={{ marginTop: 18, display: 'grid', gap: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {latest.map(s => (
               <motion.article key={s.id} className="card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.36 }}>
                 <Link to={`/stories/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }} aria-label={`Ler ${s.title}`}>
                   <div className="card-media" style={{ position: 'relative' }}>
                     <img src={s.image} alt={s.title} loading="lazy" />
                     {s.isPremium ? <div style={{ position: 'absolute', left: 8, top: 8, background: 'var(--color-shine)', color: '#000', padding: '4px 8px', borderRadius: 4, fontWeight: 800, fontSize: 12 }}>MOTION+</div> : null}
                   </div>
                   <div className="card-body">
                     <div className="story-category">{s.category}</div>
                     <h3 className="story-title">{s.title}</h3>
                     {s.excerpt ? <p className="muted card-description">{s.excerpt}</p> : null}
                   </div>
                 </Link>
               </motion.article>
             ))}
          </div>

          <div className="story-editorial-break" style={{ textAlign: 'center', padding: '24px 0' }}>
            <div className="micro muted">AS HISTÓRIAS POR TRÁS</div>
            <h3 className="display">OS CARROS.</h3>
            <p className="muted" style={{ marginTop: 8 }}>Cada carro carrega uma história — design, engenharia, velocidade e memória se entrelaçam.</p>
          </div>

          {/* Remaining stories in a full-width list */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
             {latest.map(s => (
               <article key={`list-${s.id}`} className="card card-body--lg">
                 <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                   <div style={{ width: 140, height: 92, overflow: 'hidden', borderRadius: 6, position: 'relative' }}>
                     <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover'}} loading="lazy" />
                     {s.isPremium ? <div style={{ position: 'absolute', left: 8, top: 8, background: 'var(--color-shine)', color: '#000', padding: '4px 8px', borderRadius: 4, fontWeight: 800, fontSize: 12 }}>PRÊMIO</div> : null}
                   </div>
                   <div>
                     <div className="story-category micro">{s.category}</div>
                     <div style={{ color: 'black' }} className="card-title">{s.title}</div>
                     {s.excerpt ? <div className="muted card-description" style={{ marginTop: 6 }}>{s.excerpt}</div> : null}
                   </div>
                 </div>
               </article>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ marginTop: 32, textAlign: 'center' }}>
        <h3 className="display">CONTINUE EXPLORANDO</h3>
        <p className="muted" style={{ marginTop: 8 }}>Descubra os carros por trás das histórias.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/cars" style={{color:'black'}} className="garage-cta motion-link">EXPLORAR CARROS →</Link>
        </div>
      </section>
    </main>
  )
}
