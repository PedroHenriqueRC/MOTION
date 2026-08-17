import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import type { Collection } from '../data/models'
import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CollectionCreate(){
  const navigate = useNavigate()
  const reduce = useReducedMotion()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function validate(){
    if (!title.trim()) return 'Título é obrigatório.'
    return null
  }

  async function onSubmit(e: React.FormEvent){
    e.preventDefault()
    setError(null)
    const v = validate()
    if (v) { setError(v); return }
    setSubmitting(true)
    try {
      // No persistence in repo; simulate local success
      await new Promise(res => setTimeout(res, 500))
      setSuccess(true)
      // keep data local; after short delay navigate back to collections list
      setTimeout(() => { navigate('/collections') }, 900)
    } catch (err) {
      setError('Não foi possível criar a coleção.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="container section-space-large" aria-label="Criar coleção">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 className="display-xl">CRIAR COLEÇÃO</h1>
        <Link to="/collections" className="meta motion-link">CANCELAR</Link>
      </div>

      <form onSubmit={onSubmit} style={{ marginTop: 24, maxWidth: 720 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>Título</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título da coleção" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid var(--color-border-light)', background: 'transparent', color: 'var(--color-text-primary)' }} />

        <label style={{ display: 'block', marginTop: 12, marginBottom: 8 }}>Descrição (opcional)</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição curta" style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid var(--color-border-light)', background: 'transparent', color: 'var(--color-text-primary)' }} rows={5} />

        {error && <div style={{ marginTop: 12, color: 'var(--color-error)' }}>{error}</div>}
        {success && <div style={{ marginTop: 12, color: 'var(--color-success)' }}>Coleção criada (localmente).</div>}

        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button type="submit" disabled={submitting} className="garage-cta" style={{ padding: '0.6rem 1rem' }}>{submitting ? 'CRIANDO…' : 'CRIAR COLEÇÃO'}</button>
          <button type="button" onClick={() => navigate('/collections')} className="ui-retry-btn" style={{ border: '1px solid var(--color-border-light)' }}>CANCELAR</button>
        </div>
      </form>
    </main>
  )
}
