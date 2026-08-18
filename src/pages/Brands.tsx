import React from 'react'
import { Link } from 'react-router-dom'
import { getBrands, getCars } from '../data/repo'
import type { Brand, Car } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

export default function Brands(){
  const [brands, setBrands] = React.useState<Brand[]>([])
  const [cars, setCars] = React.useState<Car[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()

  // compute cars per brand (hooks must run unconditionally)
  const counts = React.useMemo(() => {
    const m: Record<string, number> = {}
    cars.forEach(c => { m[c.brand] = (m[c.brand] || 0) + 1 })
    return m
  }, [cars])

  // alphabetical grouping
  const grouped = React.useMemo(() => {
    const g: Record<string, Brand[]> = {}
    brands.forEach(b => {
      const k = (b.name || '#').charAt(0).toUpperCase()
      if (!g[k]) g[k] = []
      g[k].push(b)
    })
    Object.keys(g).forEach(k => g[k].sort((a,b) => a.name.localeCompare(b.name)))
    return Object.fromEntries(Object.entries(g).sort((a,b) => a[0].localeCompare(b[0])))
  }, [brands])

  // featured brands by count
  const featured = React.useMemo(() => [...brands].sort((a,b) => (counts[b.name]||0)-(counts[a.name]||0)).slice(0,3), [brands, counts])

  async function load(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const [brandsRes, carsRes] = await Promise.all([getBrands(), getCars()])
      if (!mountedRef.current) return
      setBrands(brandsRes)
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
  if (!brands || brands.length === 0) return <EmptyState message="Nenhuma marca encontrada." />

  // (memos moved above to ensure hooks order)

  return (
    <main className="container section-space-large" aria-label="Marcas">
      <header className="brands-hero">
        <div className="micro muted">ARQUIVO AUTOMOTIVO</div>
        <h1 className="display-xl">MARCAS</h1>
        <p className="muted" style={{ marginTop: 8 }}>Os fabricantes por trás dos carros.</p>
          <div style={{ marginTop: 10, display: 'flex', gap: 12 }}>
          <div className="meta">{brands.length} MARCAS</div>
          <div className="meta">{cars.length} CARROS</div>
        </div>
      </header>

      {/* Featured brands */}
      <section style={{ marginTop: 20 }} aria-label="Featured brands">
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
          {featured[0] && (
            <div className="brand-feature card">
              <div className="card-body--lg">
                <div className="card-meta">DESTAQUE</div>
                <h2 className="card-title" style={{ fontSize: '1.6rem', color: 'black' }}>{featured[0].name}</h2>
                {featured[0].description ? <div className="muted card-description" style={{ marginTop: 8 }}>{featured[0].description}</div> : null}
                <div style={{ marginTop: 12 }}>
                   <Link to={`/brands/${featured[0].slug}`} style={{ color: 'var(--color-shine)', fontWeight: '700' }} className="meta motion-link">EXPLORAR MARCA →</Link>
                   <span className="muted" style={{ marginLeft: 12 }}>{counts[featured[0].name] || 0} carros</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 12 }}>
            {featured.slice(1).map(b => (
              <div key={b.id} className="card card-body">
                <div style={{ color: 'black' }} className="card-title">{b.name}</div>
                {b.description ? <div className="muted card-description">{b.description}</div> : null}
                <div style={{ marginTop: 8 }} className="muted">{counts[b.name] || 0} machines</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most complete archives: brands with largest file counts */}
      <section style={{ marginTop: 24 }} aria-label="Most complete archives">
        <h2 className="display">MAIORES ARCHIVOS</h2>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,6).map(([name, cnt]) => (
            <div key={name} className="card card-body" style={{ padding: 10 }}>
              <div style={{ fontWeight: 700 }}>{name}</div>
              <div className="muted" style={{ marginTop: 6 }}>{cnt} CARROS</div>
              <div style={{ marginTop: 8 }}><Link to="/brands" className="meta motion-link">EXPLORAR →</Link></div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand index alphabetical */}
      <section style={{ marginTop: 28 }} aria-label="Brand index">
        <h2 className="display">ÍNDICE DE MARCAS</h2>
        <div style={{ marginTop: 18, display: 'grid', gap: 18 }}>
          {Object.entries(grouped).map(([letter, items]) => (
            <div key={letter} className="brand-index-group" style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 12, alignItems: 'start' }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--color-text-muted)' }}>{letter}</div>
              <div>
                {items.map(b => (
                  <div key={b.id} className="brand-index-item" style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border)' }}>
                    <Link to={`/brands/${b.slug}`} className="motion-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 700 }}>{b.name}</div>
                          {b.description ? <div className="muted" style={{ marginTop: 6 }}>{b.description}</div> : null}
                        </div>
                        <div className="muted">{counts[b.name] || 0}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manufacturer spotlight */}
      <section style={{ marginTop: 32 }} aria-label="Manufacturer spotlight">
        <h3 className="display">DESTAQUE DO FABRICANTE</h3>
        {featured[0] && (
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, alignItems: 'start' }}>
            <div>
              <h2 style={{ color: 'black' }} className="card-title">{featured[0].name}</h2>
              {featured[0].description ? <div className="muted" style={{ marginTop: 8 }}>{featured[0].description}</div> : null}
                <div style={{ marginTop: 12 }}>
                <div className="muted" style={{ marginBottom: 8 }}>{counts[featured[0].name] || 0} carros no arquivo</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
                  {cars.filter(c => c.brand === featured[0].name).slice(0,4).map(c => (
                    <Link key={c.id} to={`/cars/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="card card-body">
                        <div className="card-meta">{c.brand}</div>
                        <div style={{ color: 'black' }} className="card-title">{c.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="card card-media" style={{ height: 320 }}>
                {cars.find(c => c.brand === featured[0].name) ? (
                  <img src={cars.find(c => c.brand === featured[0].name)!.image} alt={featured[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Editorial break */}
      <section style={{ marginTop: 32, textAlign: 'center' }}>
        <div className="micro muted">ARQUIVO</div>
        <h3 className="display">CADA NOME CONTA UMA HISTÓRIA</h3>
        <p className="muted" style={{ marginTop: 8 }}>Explore os fabricantes que construíram os carros que celebramos.</p>
      </section>

      {/* Final CTA */}
      <section style={{ marginTop: 28, textAlign: 'center' }}>
        <h3 className="display">DESCUBRA OS CARROS</h3>
        <p className="muted" style={{ marginTop: 8 }}>Explore os carros por trás dos nomes icônicos do mundo.</p>
        <div style={{ marginTop: 12 }}>
          <Link to="/cars" style={{color:'black'}} className="garage-cta motion-link">EXPLORAR CARROS →</Link>
        </div>
      </section>

    </main>
  )
}
