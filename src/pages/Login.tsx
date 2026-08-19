import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const location = useLocation()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(email.trim(), password)
      // redirect to the page user came from or /account
      const from = (location.state as any)?.from ?? '/account'
      nav(from)
    } catch (err: any) {
      setError(err.message || 'Erro ao efetuar login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container section-space-large" style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'center' }} aria-label="Entrar">
      <h1 className="display" style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>Entrar</h1>
      <p className="muted">Entre com seu email e senha. Para demonstração use <strong>demo@motion.local</strong> / <strong>motion123</strong>.</p>

      <form onSubmit={onSubmit} style={{ marginTop: 18, minWidth: 360, display: 'flex', flexDirection: 'column' , alignItems: 'flex-start' }} noValidate>
        {error ? <div className="card error">{error}</div> : null}
        <label style={{ display: 'block', marginTop: 12 }}>Email</label>
        <input aria-label="Email" style={{width: '100%'}} value={email} onChange={e => setEmail(e.target.value)} />

        <label style={{ display: 'block', marginTop: 12 }}>Senha</label>
        <input type="password" style={{width: '100%'}} aria-label="Senha" value={password} onChange={e => setPassword(e.target.value)} />

        <div style={{ marginTop: 18, alignItems: 'center', width: '100%', display: 'flex', gap: 6, flexDirection: 'column', flexWrap: 'wrap' }}>
          <button className="garage-cta" type="submit" disabled={loading}>{loading ? 'Acessando...' : 'Entrar'}</button>
        </div>
      </form>
    </div>
  )
}
