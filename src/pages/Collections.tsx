import React from 'react'
import { Link } from 'react-router-dom'
import { getCollections, getCars } from '../data/repo'
import type { Collection, Car } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

export default function Collections(){
  const [collections, setCollections] = React.useState<Collection[]>([])
  const [cars, setCars] = React.useState<Car[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()

  // derive featured collection before early returns to keep hooks order stable
  const featured = React.useMemo(() => {
    if (!collections || collections.length === 0) return undefined
    // prefer collections with longer descriptions (more editorial text)
    const withDesc = collections.filter(c => c.description && c.description.length > 30)
    return withDesc.length ? withDesc[0] : collections[0]
  }, [collections])

  async function load(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const [collectionsRes, carsRes] = await Promise.all([getCollections(), getCars()])
      if (!mountedRef.current) return
      setCollections(collectionsRes)
      setCars(carsRes)
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

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { load() }} />
  if (!collections || collections.length === 0) return <EmptyState message="Nenhuma coleção encontrada." />

  const remaining = collections.filter(c => c.id !== featured?.id)

  return (
    <main className="container section-space-large" aria-label="Coleções">
      <header className="collections-hero">
        <div className="micro muted">ARQUIVO AUTOMOTIVO CURADO</div>
        <h1 className="display-xl">COLEÇÕES</h1>
        <p className="muted hero-description" style={{ marginTop: 8 }}>Seleção editorial de carros e universos curados.</p>
        <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="meta">{collections.length} COLLECTIONS</div>
          <div className="meta">{cars.length} MACHINES</div>
        </div>
      </header>

      {/* Featured Collection */}
      {featured && (
        <section style={{ marginTop: 28 }} aria-label="Featured collection">
          <div className="collection-feature card">
          <div className="card-body--lg">
              <div className="card-meta">SELEÇÃO CURADA</div>
              <h2 className="card-title" style={{ fontSize: '1.6rem', color: 'black' }}>{featured.title}</h2>
              {featured.description ? <div className="muted card-description" style={{ marginTop: 8 }}>{featured.description}</div> : null}
              <div style={{ marginTop: 12 }}>
                <Link to={`/collections/${featured.slug}`} className="meta motion-link" style={{color: 'var(--color-shine)'}}>EXPLORAR COLEÇÃO →</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Collection Index */}
      <section style={{ marginTop: 32 }} aria-label="Índice de coleções">
        <h2 className="display">ÍNDICE DE COLEÇÕES</h2>
        <div style={{ marginTop: 18, display: 'grid', gap: 12 }}>
          {collections.map((c, i) => (
            <div key={c.id} className="collection-index-item" style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--color-border)' }}>
              <div className="collection-index-number" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-secondary)' }}>{String(i+1).padStart(2, '0')}</div>
              <div>
                <Link to={`/collections/${c.slug}`} className="motion-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  {c.description ? <div className="muted" style={{ marginTop: 6 }}>{c.description}</div> : null}
                </Link>
              </div>
              <div className="muted" style={{ fontSize: 12 }}>{c.slug}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection Spotlight */}
      <section style={{ marginTop: 32 }} aria-label="Collection spotlight">
        <h3 className="display">DESTAQUE DA COLEÇÃO</h3>
        {remaining[0] && (
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, alignItems: 'start' }}>
            <div>
              <h2 style={{color: 'white'}} className="card-title">{remaining[0].title}</h2>
              {remaining[0].description ? <div className="muted" style={{ marginTop: 8 , color: 'white' }}>{remaining[0].description}</div> : null}
              <div style={{ marginTop: 12 }}>
                 <Link to={`/collections/${remaining[0].slug}`} className="meta motion-link" style={{ color: 'var(--color-shine)' }}>EXPLORAR COLEÇÃO →</Link>
              </div>
            </div>
            <div>
              <div className="card card-media" style={{ height: 320 }}>
                <div className="card-media-image" style={{ backgroundImage: `url(/images/stories/AnalogicosdeOuro.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}></div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Curated selections */}
      <section style={{ marginTop: 32 }} aria-label="Seleções curadas">
        <h3 className="display">SELEÇÕES CURADAS</h3>
        <div style={{ marginTop: 12 }}>
          <div className="cards-grid-wide">
            {collections.map(col => (
              <article key={col.id} className="card">
                <div className="card-body--lg">
                  <div style={{ color: 'black' }} className="card-title">{col.title}</div>
                  {col.description ? <div className="muted card-description">{col.description}</div> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial break */}
      <section style={{ marginTop: 28, textAlign: 'center' }}>
        <div className="micro muted">CURADORIA</div>
        <h3 className="display">NEM TODO CARRO PERTENCE À MESMA HISTÓRIA</h3>
        <p className="muted" style={{ marginTop: 8 }}>As coleções agrupam carros por ideia, época e obsessão.</p>
      </section>

      {/* Final CTA */}
      <section style={{ marginTop: 24, textAlign: 'center' }}>
        <h3 className="display">EXPLORAR O ARQUIVO</h3>
        <p className="muted" style={{ marginTop: 8 }}>Descubra outra forma de experienciar o MOTION.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/cars" style={{color:'black'}} className="garage-cta motion-link">EXPLORAR CARROS →</Link>
        </div>
      </section>

    </main>
  )
}
