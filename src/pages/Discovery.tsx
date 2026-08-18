import React from 'react'
import { Link } from 'react-router-dom'
import { getCars, getStories, getBrands, getCollections } from '../data/repo'
import type { Car, Story, Brand, Collection } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

export default function Discovery(){
  const [cars, setCars] = React.useState<Car[]>([])
  const [stories, setStories] = React.useState<Story[]>([])
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [collections, setCollections] = React.useState<Collection[]>([])

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()

  async function loadAll(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const [carsRes, storiesRes, brandsRes, collectionsRes] = await Promise.all([
        getCars(), getStories(), getBrands(), getCollections()
      ])
      if (!mountedRef.current) return
      setCars(carsRes)
      setStories(storiesRes)
      setBrands(brandsRes)
      setCollections(collectionsRes)
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
    loadAll()
    return () => { mountedRef.current = false }
  }, [])

  // compute memoized values before any early returns so hook order is stable
  // editorial curated selections (deterministic)
  const editorPicks = React.useMemo(() => {
    return [...cars].filter(c => typeof c.valueUsd === 'number').sort((a,b) => (b.valueUsd! - a.valueUsd!)).slice(0,4)
  }, [cars])

  const eras = React.useMemo(() => {
    const m: Record<string, number> = {}
    cars.forEach(c => { if (c.year) { const d = Math.floor(Number(c.year)/10)*10; const label = `${d}s`; m[label] = (m[label]||0)+1}})
    return Object.entries(m).sort((a,b) => Number(a[0].slice(0,4)) - Number(b[0].slice(0,4)))
  }, [cars])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { loadAll() }} />

  const anyData = cars.length || stories.length || brands.length || collections.length
  if (!anyData) return <EmptyState message="Nenhum conteúdo disponível." />

  const firstCars = cars.slice(0,3)
  const firstStories = stories.slice(0,4)
  const firstBrands = brands.slice(0,4)
  const firstCollections = collections.slice(0,4)

  return (
    <main className="container section-space-large" aria-label="Descoberta">
      <header>
        <h1 className="display-xl">DESCUBRA</h1>
        <p className="muted" style={{ marginTop: 8 }}>Explore carros, histórias, marcas e coleções dos arquivos <span style={{ fontWeight: 'bold', color: 'white', display: 'inline' }}>MOTION</span>.</p>
      </header>

      {/* Editor's Picks */}
      {editorPicks.length > 0 && (
        <section style={{ marginTop: 28 }} aria-label="Editor's picks">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">ESCOLHA DO EDITOR</h2>
            <a href="/cars" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODOS →</a>
          </div>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
            {editorPicks.map(c => (
              <article key={c.id} className="card">
                <div className="card-media"><img src={c.image} alt={`${c.brand} ${c.name}`} loading="lazy" /></div>
                <div className="card-body">
                  <div className="muted card-meta">{c.brand}</div>
                  <div style={{ color: 'black' }} className="card-title">{c.name}</div>
                  {c.valueUsd ? <div className="muted" style={{ marginTop: 6 }}>US$ {c.valueUsd.toLocaleString('en-US')}</div> : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Cars Section */}
      {firstCars.length > 0 && (
        <section style={{ marginTop: 32 }} aria-label="Cars">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">CARROS</h2>
            <Link to="/cars" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODOS OS CARROS →</Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {firstCars.map(c => (
              <motion.article key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.36 }}>
                <Link to={`/cars/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="card">
                    <div className="card-media">
                      <img src={c.image} alt={`${c.brand} ${c.name}`} loading="lazy" />
                    </div>
                    <div className="card-body">
                      <div className="muted card-meta">{c.brand}</div>
                      <div style={{ color: 'black' }} className="card-title">{c.name}</div>
                    </div>
                  </article>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Stories Section */}
      {firstStories.length > 0 && (
        <section style={{ marginTop: 32 }} aria-label="Stories">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">HISTÓRIAS</h2>
            <Link to="/stories" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODAS AS HISTÓRIAS →</Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {firstStories.map(s => (
              <motion.article key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.36 }}>
                <Link to={`/stories/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article className="card">
                    <div className="card-media">
                      <img src={s.image} alt={s.title} loading="lazy" />
                    </div>
                    <div className="card-body">
                      {s.category ? <div className="story-category">{s.category}</div> : null}
                      <div style={{ color: 'black' }} className="card-title">{s.title}</div>
                      {s.excerpt ? <div className="muted card-description">{s.excerpt}</div> : null}
                    </div>
                  </article>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Brands Section */}
      {firstBrands.length > 0 && (
        <section style={{ marginTop: 32 }} aria-label="Brands">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">MARCAS</h2>
            <Link to="/brands" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODAS AS MARCAS →</Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {firstBrands.map(b => (
              <motion.article key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.36 }}>
                <Link to={`/brands/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="card card-body">
                      <div style={{ color: 'black' }} className="card-title">{b.name}</div>
                      {b.description ? <div className="muted card-description">{b.description}</div> : null}
                    </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Collections Section */}
      {firstCollections.length > 0 && (
        <section style={{ marginTop: 32, marginBottom: 24 }} aria-label="Collections">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">COLEÇÕES</h2>
            <Link to="/collections" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR TODAS AS COLEÇÕES →</Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {firstCollections.map(c => (
              <motion.article key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.36 }}>
                <Link to={`/collections/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card card-body">
                    <div style={{ color: 'black' }} className="card-title">{c.title}</div>
                    {c.description ? <div className="muted card-description">{c.description}</div> : null}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* Explore by Era */}
      {eras.length > 0 && (
        <section style={{ marginTop: 32, marginBottom: 24 }} aria-label="Explore by era">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">EXPLORE POR DÉCADA</h2>
            <a href="/cars" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>VER ARQUIVO →</a>
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {eras.map(([era, count]) => (
              <div key={era} className="card card-body" style={{ padding: 10 }}>
                <div style={{ fontWeight: 800 }}>{era}</div>
                <div className="muted" style={{ marginTop: 6 }}>{count} MACHINES</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
