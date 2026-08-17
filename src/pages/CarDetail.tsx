import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getCars, getBrands } from '../data/repo'
import type { Car } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'

export default function CarDetail(){
  const { slug } = useParams()
  const [car, setCar] = React.useState<Car | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)
  const reduce = useReducedMotion()
  const GARAGE_KEY = 'motion:garage:cars'
  const [saved, setSaved] = React.useState(false)
  const [cars, setCars] = React.useState<Car[]>([])
  const [brandSlug, setBrandSlug] = React.useState<string | undefined>(undefined)
  async function loadCar(){
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const [carsRes, brandsRes] = await Promise.all([getCars(), getBrands()])
      if (!mountedRef.current) return
      setCars(carsRes)
      const found = carsRes.find(c => c.slug === slug)
      // robust brand slug lookup using brands data
      if (found) {
        const matched = brandsRes.find(b => String(b.name).toLowerCase() === String(found.brand).toLowerCase())
        if (matched) setBrandSlug(matched.slug)
      }
      if (!mountedRef.current) return
      setCar(found)
      // related will be derived from cars/car relationship (see useMemo below)
      // initialize saved state for this slug
      try {
        const raw = localStorage.getItem(GARAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        const arr = Array.isArray(parsed) ? parsed.map(String) : []
        setSaved(Boolean(slug && arr.includes(slug)))
      } catch (err) {
        setSaved(false)
      }
    } catch (err) {
      if (!mountedRef.current) return
      setError(true)
    } finally {
      if (!mountedRef.current) return
      setLoading(false)
    }
  }

  function addToGarage(carSlug: string) {
    try {
      const raw = localStorage.getItem(GARAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      const arr = Array.isArray(parsed) ? parsed.map(String) : []
      if (!arr.includes(carSlug)) {
        const next = [...arr, carSlug]
        localStorage.setItem(GARAGE_KEY, JSON.stringify(next))
        setSaved(true)
      }
    } catch (err) {
      // ignore
    }
  }

  function removeFromGarage(carSlug: string) {
    try {
      const raw = localStorage.getItem(GARAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      const arr = Array.isArray(parsed) ? parsed.map(String) : []
      const next = arr.filter(s => s !== carSlug)
      localStorage.setItem(GARAGE_KEY, JSON.stringify(next))
      setSaved(false)
    } catch (err) {
      // ignore
    }
  }

  // derive related cars semantically: prefer same brand (priority), fallback to other cars
  // Rule: relatedCars = cars.filter(c => c.id !== car.id && c.brand === car.brand)
  // Limit: show up to 4. If none from same brand, fallback to other cars (excluding current) up to 4.
  const relatedCars = React.useMemo(() => {
    if (!car) return [] as Car[]
    // prefer same brand using id comparison for safety
    const sameBrand = cars.filter(c => c.id !== car.id && c.brand === car.brand)
    if (sameBrand.length > 0) return sameBrand.slice(0, 4)
    // fallback: any other cars excluding current
    return cars.filter(c => c.id !== car.id).slice(0, 4)
  }, [cars, car])

  const hasSameBrand = React.useMemo(() => {
    if (!car) return false
    return cars.some(c => c.id !== car.id && c.brand === car.brand)
  }, [cars, car])

  React.useEffect(() => {
    mountedRef.current = true
    loadCar()
    return () => { mountedRef.current = false }
  }, [slug])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { loadCar() }} />
  if (!car) return <EmptyState message="Car not found." />

  return (
    <main className="container section-space-large" aria-label={`${car.brand} ${car.name}`}>
      <div className="car-back">
        <Link to="/cars" className="meta motion-link">← VOLTAR PARA CARROS</Link>
      </div>

      {/* Hero editorial do carro */}
      <article className="car-hero" aria-label="Hero do carro">
        <div className="car-hero-media">
          <img src={car.image} alt={`${car.brand} ${car.name}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        <div className="car-hero-body">
          <div className="featured-meta">CARRO / DETALHE</div>
          <div className="hero-brand micro muted">
            {brandSlug ? (
              <Link to={`/brands/${brandSlug}`} className="motion-link">{car.brand}</Link>
            ) : (
              <span>{car.brand}</span>
            )}
          </div>
          <h1 className="featured-title">{car.name} <span className="muted">— {car.year}</span></h1>
          {car.valueUsd ? (
            <div style={{ marginTop: 8 }}>
              <div className="meta">VALOR</div>
              <div style={{ marginTop: 4 }} className="body">US$ {car.valueUsd.toLocaleString('en-US')}</div>
            </div>
          ) : null}
          {car.description ? (
            <div style={{ marginTop: 12 }}>
              <h3 className="editorial">SOBRE O CARRO</h3>
              <p className="body" style={{ marginTop: 8 }}>{car.description}</p>
            </div>
          ) : null}

            <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
            {saved ? (
              <button className="ui-retry-btn" onClick={() => removeFromGarage(car.slug)}>REMOVER DA GARAGEM</button>
            ) : (
              <button className="garage-cta" onClick={() => addToGarage(car.slug)}>ADICIONAR À GARAGEM</button>
            )}
            <Link to="/cars" className="meta motion-link" style={{ display: 'flex', alignItems: 'center' }}>VER TODOS OS CARROS</Link>
          </div>
        </div>
      </article>

      {/* Specs / Technical */}
      {car.specs && (
        <section className="car-specs-section">
          <h4 className="meta">ESPECIFICAÇÕES</h4>
          <div className="car-spec-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginTop: 12 }}>
            {car.specs.engine && <div className="spec-item"><div className="muted">Motor</div><div className="spec-value">{car.specs.engine}</div></div>}
            {car.specs.power && <div className="spec-item"><div className="muted">Potência</div><div className="spec-value">{car.specs.power}</div></div>}
            {car.specs.torque && <div className="spec-item"><div className="muted">Torque</div><div className="spec-value">{car.specs.torque}</div></div>}
            {car.specs.transmission && <div className="spec-item"><div className="muted">Transmissão</div><div className="spec-value">{car.specs.transmission}</div></div>}
            {car.specs.drivetrain && <div className="spec-item"><div className="muted">Tração</div><div className="spec-value">{car.specs.drivetrain}</div></div>}
            {car.specs.acceleration && <div className="spec-item"><div className="muted">0-100 km/h</div><div className="spec-value">{car.specs.acceleration}</div></div>}
            {car.specs.topSpeed && <div className="spec-item"><div className="muted">Velocidade máxima</div><div className="spec-value">{car.specs.topSpeed}</div></div>}
          </div>
        </section>
      )}

      {/* Related machines */}
      {relatedCars && relatedCars.length > 0 && (
        <section className="car-related" style={{ marginTop: 28 }} aria-label="Related machines">
          <h3 className="display car-related-header">{hasSameBrand ? `MAIS DA ${car.brand}` : 'CONTINUE EXPLORANDO'}</h3>
          <div style={{ marginTop: 12 }}>
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="cards-grid">
                {relatedCars.map((c, idx) => (
                  <Link key={c.id} to={`/cars/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <article className={idx === 0 ? 'card card-featured' : 'card'}>
                      <div className="card-media"><img src={c.image} alt={`${c.brand} ${c.name}`} loading="lazy" /></div>
                      <div className="card-body">
                        <div className="muted card-meta">{c.brand}</div>
                        <div style={{ color: 'black' }} className="card-title">{c.name}</div>
                        <div className="muted" style={{ marginTop: 6 }}>{c.year}</div>
                        {c.description ? <div className="muted card-description">{c.description}</div> : null}
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Final editorial CTA */}
      <section style={{ marginTop: 36, textAlign: 'center' }}>
        <h3 className="display">CONTINUE EXPLORANDO.</h3>
        <p className="muted" style={{ marginTop: 8 }}>Sempre há outro carro a descobrir.</p>
        <div style={{ marginTop: 18 }}>
          <Link to="/cars" className="garage-cta motion-link" style={{ color: 'black' }}>EXPLORAR CARROS →</Link>
        </div>
      </section>
    </main>
  )
}
