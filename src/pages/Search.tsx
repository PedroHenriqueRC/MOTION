import React from 'react'
import { Link } from 'react-router-dom'
import { getCars, getStories, getBrands, getCollections } from '../data/repo'
import type { Car, Story, Brand, Collection } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

export default function Search(){
  const [cars, setCars] = React.useState<Car[]>([])
  const [stories, setStories] = React.useState<Story[]>([])
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [collections, setCollections] = React.useState<Collection[]>([])

  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const [query, setQuery] = React.useState('')

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

  // search helpers
  const normalized = (s: string) => s.toLowerCase()

  const matches = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { cars: [] as Car[], stories: [] as Story[], brands: [] as Brand[], collections: [] as Collection[] }

    const carMatches = cars.filter(c => {
      return [c.name, c.brand, c.slug, c.description || ''].some(f => f && normalized(f).includes(q))
    })

    const storyMatches = stories.filter(s => {
      return [s.title, s.category, s.excerpt || '', s.slug].some(f => f && normalized(f).includes(q))
    })

    const brandMatches = brands.filter(b => {
      return [b.name, b.description || '', b.slug].some(f => f && normalized(f).includes(q))
    })

    const collectionMatches = collections.filter(c => {
      return [c.title, c.description || '', c.slug].some(f => f && normalized(f).includes(q))
    })

    return { cars: carMatches, stories: storyMatches, brands: brandMatches, collections: collectionMatches }
  }, [query, cars, stories, brands, collections])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { loadAll() }} />

  const hasQuery = query.trim().length > 0
  const anyResults = hasQuery && (matches.cars.length || matches.stories.length || matches.brands.length || matches.collections.length)

  return (
    <main className="container section-space-large" aria-label="Busca">
      <div style={{ maxWidth: 920 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="search"
              aria-label="Buscar no MOTION"
              placeholder="Buscar no MOTION..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ flex: 1, padding: '10px 12px', borderRadius: 6, border: '1px solid var(--color-border-light)', background: 'transparent', color: 'var(--color-text-primary)' }}
            />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Limpar busca" className="ui-retry-btn">LIMPAR</button>
          )}
        </div>

        {!hasQuery && (
          <div style={{ marginTop: 28 }}>
            <h1 className="display-xl">BUSCA</h1>
            <p className="muted" style={{ marginTop: 8 }}>Pesquise por carros, histórias, marcas e coleções usando o campo acima.</p>
          </div>
        )}

        {hasQuery && !anyResults && (
            <div style={{ marginTop: 24 }}>
            <EmptyState message={`Nenhum resultado encontrado para sua busca.`} />
          </div>
        )}

        {hasQuery && anyResults && (
          <div style={{ marginTop: 24, display: 'grid', gap: 28 }}>
            {matches.cars.length > 0 && (
              <section>
                <h2 className="meta">CARROS</h2>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                  {matches.cars.map(c => (
                    <motion.article key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.28 }}>
                      <Link to={`/cars/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card card-body">
                          <div className="muted card-meta">{c.brand}</div>
                          <div className="card-title">{c.name}</div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {matches.stories.length > 0 && (
              <section>
                <h2 className="meta">HISTÓRIAS</h2>
                <div style={{ marginTop: 12, display: 'grid', gap: 12 }}>
                  {matches.stories.map(s => (
                    <motion.article key={s.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.28 }}>
                      <Link to={`/stories/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card card-body">
                          <div className="story-category">{s.category}</div>
                          <div className="card-title">{s.title}</div>
                          {s.excerpt ? <div className="muted card-description">{s.excerpt}</div> : null}
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {matches.brands.length > 0 && (
              <section>
                <h2 className="meta">MARCAS</h2>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                  {matches.brands.map(b => (
                    <motion.article key={b.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.28 }}>
                      <Link to={`/brands/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card card-body">
                          <div className="muted card-meta">{b.slug}</div>
                          <div className="card-title">{b.name}</div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}

            {matches.collections.length > 0 && (
              <section>
                <h2 className="meta">COLEÇÕES</h2>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
                  {matches.collections.map(c => (
                    <motion.article key={c.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.28 }}>
                      <Link to={`/collections/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="card card-body">
                          <div className="muted card-meta">{c.slug}</div>
                          <div className="card-title">{c.title}</div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
