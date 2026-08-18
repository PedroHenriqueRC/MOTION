import React from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getCars } from '../data/repo'
import type { Car } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'

export default function Cars(){
  const [cars, setCars] = React.useState<Car[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const reduce = useReducedMotion()

  const mountedRef = React.useRef(true)

  async function loadCars(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const res = await getCars()
      if (!mountedRef.current) return
      setCars(res)
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
    loadCars()
    return () => { mountedRef.current = false }
  }, [])

  // shuffle cars for random presentation (Fisher-Yates)
  const shuffled = React.useMemo(() => {
    const arr = [...cars]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [cars])

  const featured = shuffled[0]
  const remaining = shuffled.slice(1)

  const brandCounts = React.useMemo(() => {
    const m: Record<string, number> = {}
    cars.forEach(c => { m[c.brand] = (m[c.brand] || 0) + 1 })
    return m
  }, [cars])

  const eras = React.useMemo(() => {
    const m: Record<string, number> = {}
    cars.forEach(c => { if (c.year) { const d = Math.floor(Number(c.year)/10)*10; const label = `${d}s`; m[label] = (m[label]||0)+1 } })
    return Object.entries(m).sort((a,b) => Number(a[0].slice(0,4)) - Number(b[0].slice(0,4)))
  }, [cars])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { loadCars() }} />


  return (
    <main className="container section-space-large" aria-label="Carros">
      {/* Hero / Header */}
      <header className="cars-hero">
        <div className="micro muted">ÍNDICE AUTOMOTIVO</div>
        <h1 className="display-xl">CARROS</h1>
        <p className="muted" style={{ marginTop: 8 }}>Catálogo editorial de carros, marcas e histórias selecionadas pelo MOTION.</p>
          <div style={{ marginTop: 10, display: 'flex', gap: 12, alignItems: 'center' }}>
           <div className="meta">{cars.length} VEÍCULOS</div>
           <div className="meta">VISUALIZAÇÃO EDITORIAL</div>
         </div>
      </header>

      {/* Featured car editorial */}
      {featured && (
        <section style={{ marginTop: 24 }} aria-label="Destaque">
          <article className="featured-spread" aria-label="Carro em destaque">
            <div>
              <div className="featured-meta">DESTAQUE / CATÁLOGO</div>
              <h2 className="featured-title">{featured.brand}</h2>
              <h3 className="featured-subtitle">{featured.name} <span className="muted">— {featured.year}</span></h3>
              {featured.description ? <p className="muted featured-description">{featured.description}</p> : null}
              <motion.div whileHover={reduce ? {} : { x: 6 }} style={{ marginTop: 12 }}>
                 <Link to={`/cars/${featured.slug}`} className="meta featured-cta motion-link" style={{ color: 'var(--color-shine)' }}>VER CARRO →</Link>
              </motion.div>
            </div>

            <div className="featured-media">
              <div className="card-media">
                <img src={featured.image} alt={`${featured.brand} ${featured.name}`} loading="lazy" />
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Main index grid */}
      <section style={{ marginTop: 28 }} aria-label="Explorar carros">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h2 className="display">EXPLORAR</h2>
            <Link to="/brands" className="meta motion-link" style={{ color: 'var(--color-shine)' }}>VER MARCAS →</Link>
          </div>

        <motion.div initial={reduce ? {} : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginTop: 18 }}>
          <div className="cards-grid">
            {remaining.map(car => (
              <Link key={car.id} to={`/cars/${car.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <article className="card" aria-label={`${car.brand} ${car.name}`}>
                  <div className="card-media"><img src={car.image} alt={`${car.brand} ${car.name}`} loading="lazy" /></div>
                  <div className="card-body">
                    <div className="muted card-meta">{car.brand}</div>
                    <div  style={{ color: 'black' }} className="card-title">{car.name}</div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Editorial break */}
      <section style={{ marginTop: 36, marginBottom: 24 }} aria-hidden>
        <div className="garage-section-divider" />
        <div style={{ textAlign: 'center', marginTop: 12 }}>
          <div className="micro muted">AS MÁQUINAS</div>
          <h3 className="display">POR TRÁS DO MOTION</h3>
          <p className="muted" style={{ marginTop: 8 }}>Curadorias editoriais que exploram a engenharia e a cultura por trás dos carros.</p>
        </div>
      </section>

      {/* Explore by Era and Brand */}
      <section style={{ marginTop: 18 }} aria-label="Explore by era and brand">
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <h4 className="display">EXPLORE POR DÉCADA</h4>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {eras.map(([era, count]) => (
                <div key={era} className="card card-body" style={{ padding: 10 }}>
                  <div style={{ fontWeight: 800 }}>{era}</div>
                  <div className="muted" style={{ marginTop: 6 }}>{count} MACHINES</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ width: 320 }}>
            <h4 className="display">EXPLORE POR MARCA</h4>
            <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
              {Object.entries(brandCounts).sort((a,b) => b[1]-a[1]).slice(0,6).map(([name, cnt]) => (
                <div key={name} className="card card-body" style={{ padding: 10 }}>
                  <div style={{ fontWeight: 700 }}>{name}</div>
                  <div className="muted" style={{ marginTop: 6 }}>{cnt} CARROS</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ marginTop: 36, textAlign: 'center' }}>
        <h3 className="display">ENCONTRE SUA PRÓXIMA OBSESSÃO.</h3>
        <p className="muted" style={{ marginTop: 8 }}>Explore mais a fundo o universo editorial do MOTION.</p>
        <div style={{ marginTop: 18 }} className="home-cta">
          <motion.a href="/discovery" style={{color:'black'}} className="garage-cta motion-link" whileHover={reduce ? {} : { x: 6 }}>DESCOBRIR →</motion.a>
        </div>
      </section>
    </main>
  )
}
