import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCollectionBySlug } from '../data/repo'
import type { Collection } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'
import { collections as mockCollections } from '../data/mock'

export default function CollectionDetail(){
  const { slug } = useParams()
  const [collection, setCollection] = React.useState<Collection | undefined>(undefined)
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
        setCollection(undefined)
      } else {
        const res = await getCollectionBySlug(slug)
        if (!mountedRef.current) return
        setCollection(res)
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
  if (!collection) return <EmptyState message="Coleção não encontrada." />

  return (
    <main className="container section-space-large" aria-label={collection.title}>
      <div className="collection-back">
        <Link to="/collections" className="meta motion-link">← VOLTAR PARA COLEÇÕES</Link>
      </div>

      <article className="featured-spread" aria-label="Detalhe da coleção">
        <div>
          <div className="featured-meta">COLEÇÃO / DETALHE</div>
          <h2 className="featured-title">{collection.title}</h2>
          {collection.description ? <p className="muted featured-description">{collection.description}</p> : null}
        </div>

        <motion.div className="featured-media" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.7 }}>
          {/* Collections currently have no media in mock; keep layout consistent */}
          <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }} />
        </motion.div>
      </article>
      <section style={{ marginTop: 18 }} aria-label="Collection editorial">
        {collection.description ? <div className="muted">{collection.description}</div> : null}
        <div style={{ marginTop: 12 }}>
          <h4 className="display">EXPLORE A COLEÇÃO</h4>
          <p className="muted" style={{ marginTop: 8 }}>Esta coleção é uma curadoria editorial do arquivo MOTION. Navegue pelo arquivo para descobrir máquinas relacionadas por tema.</p>
        </div>
      </section>

      {/* More collections */}
      <section style={{ marginTop: 20 }} aria-label="More collections">
        <h4 className="display">OUTRAS COLEÇÕES</h4>
        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          {/* show other collections as navigation */}
          {(() => {
            const all: any[] = mockCollections || []
            return all.filter((c: any) => c.id !== collection.id).slice(0,4).map((c: any) => (
              <Link key={c.id} to={`/collections/${c.slug}`} className="card card-body" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ fontWeight: 700 }}>{c.title}</div>
                {c.description ? <div className="muted" style={{ marginTop: 6 }}>{c.description}</div> : null}
              </Link>
            ))
          })()}
        </div>
      </section>
    </main>
  )
}
