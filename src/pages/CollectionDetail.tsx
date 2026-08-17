import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCollectionBySlug } from '../data/repo'
import type { Collection } from '../data/models'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import EmptyState from '../components/ui/EmptyState'
import { motion, useReducedMotion } from 'framer-motion'

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
    </main>
  )
}
