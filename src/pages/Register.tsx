import React from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getPlanByKey, subscriptionPlans } from '../data/mock'
import type { SubscriptionPlan } from '../data/models'

function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email)
}

export default function Register() {
  const [search] = useSearchParams()
  const planKey = search.get('plan') ?? 'free'
  const plan = getPlanByKey(planKey) as SubscriptionPlan | undefined
  const { register } = useAuth()
  const nav = useNavigate()

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    // prefill demo credentials when opening /register?plan=demo (not required)
  }, [])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Nome é obrigatório'
    if (!email.trim()) errs.email = 'Email é obrigatório'
    else if (!validateEmail(email)) errs.email = 'Email inválido'
    if (!password) errs.password = 'Senha é obrigatória'
    else if (password.length < 6) errs.password = 'Senha deve ter ao menos 6 caracteres'
    if (confirm !== password) errs.confirm = 'As senhas não conferem'
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      // build user object using plan param
      const selectedPlan = plan ?? getPlanByKey('free')
      const userPayload = {
        name: name.trim(),
        email: email.trim(),
        planId: selectedPlan?.id ?? 'p_free',
        subscriptionStatus: selectedPlan?.billingCycle === 'free' ? ('none' as const) : ('active' as const)
      }
      await register(userPayload, password)
      // after register, navigate to /account (prepared area)
      nav('/account')
    } catch (err: any) {
      setErrors({ form: err.message || 'Erro ao criar conta' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container section-space-large" style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', alignItems: 'center' }} aria-label="Criar Conta">
      <h1 className="display">Criar Conta</h1>
      <p className="muted">Preencha seus dados para criar uma conta MOTION.
      {plan ? <span style={{ display: 'block', marginTop: 8 }}>Você está escolhendo: <strong>{plan.title}</strong> — <span className="muted">{plan.price}</span></span> : null}
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 18, maxWidth: 640, display: 'flex',flexDirection: 'column', gap: 6, flexWrap: 'wrap' }} noValidate>
        {errors.form ? <div className="card error">{errors.form}</div> : null}
        <label style={{ display: 'block', marginTop: 12}}>Nome</label>
        <input aria-label="Nome" value={name} onChange={e => setName(e.target.value)} style={{ width: 300 }} />
        {errors.name ? <div className="muted" style={{ color: 'var(--color-error)', marginTop: 6 }}>{errors.name}</div> : null}
{/* aumente todos os os tamanhos dos campos de input para 300px */}
        <label style={{ display: 'block', marginTop: 12 }}>Email</label>
        <input aria-label="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: 300 }} />
        {errors.email ? <div className="muted" style={{ color: 'var(--color-error)', marginTop: 6 }}>{errors.email}</div> : null}

        <label style={{ display: 'block', marginTop: 12 }}>Senha</label>
        <input type="password" aria-label="Senha" value={password} onChange={e => setPassword(e.target.value)} style={{ width: 300 }} />
        {errors.password ? <div className="muted" style={{ color: 'var(--color-error)', marginTop: 6 }}>{errors.password}</div> : null}

        <label style={{ display: 'block', marginTop: 12 }}>Confirmar senha</label>
        <input type="password" aria-label="Confirmar senha" value={confirm} onChange={e => setConfirm(e.target.value)} style={{ width: 300 }}/>
        {errors.confirm ? <div className="muted" style={{ color: 'var(--color-error)', marginTop: 6 }}>{errors.confirm}</div> : null}

        <div style={{ marginTop: 18, display: 'flex', gap: 8, flexDirection: 'column', alignItems: 'center' }}>
          <button className="garage-cta" type="submit" disabled={submitting}>{submitting ? 'Criando...' : 'Criar Conta'}</button>
        </div>
      </form>
    </div>
  )
}
