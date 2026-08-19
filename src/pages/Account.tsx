import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getPlanByKey, subscriptionPlans } from '../data/mock'
import type { SubscriptionPlan, Story } from '../data/models'
import { getStories } from '../data/repo'

export default function Account() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [plan, setPlan] = React.useState<SubscriptionPlan | undefined>(undefined)
  const [premiumStories, setPremiumStories] = React.useState<Story[]>([])
  const [loadingStories, setLoadingStories] = React.useState(true)
  const [manageOpen, setManageOpen] = React.useState(false)

  React.useEffect(() => {
    if (!user) {
      // redirect guests to login
      nav('/login')
      return
    }
    const planIdentifier = user.planId || 'free'
    const p = subscriptionPlans.find(sp => sp.id === planIdentifier || sp.key === planIdentifier)
      ?? getPlanByKey('free')
    setPlan(p)
  }, [user, nav])

  React.useEffect(() => {
    let mounted = true
    async function load() {
      setLoadingStories(true)
      const all = await getStories()
      if (!mounted) return
      setPremiumStories(all.filter(s => s.isPremium))
      setLoadingStories(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  if (!user) return null // redirect handled in effect

  const isFree = user.planId === 'p_free' && user.subscriptionStatus !== 'active'
  const isSubscriber = user.subscriptionStatus === 'active'

  return (
    <main className="container section-space-large" aria-label="Central do Usuário">
      <header>
        <div className="micro muted">MINHA CONTA</div>
        <h1 className="display">Olá, {user.name}</h1>
        <p className="muted" style={{ marginTop: 8 }}>Este é seu espaço dentro do MOTION — seu plano, benefícios e atalhos para o conteúdo que importa.</p>
      </header>

      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 18 }}>
        <section>
          {/* account summary card */}
          <div className="card" style={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div className="muted">USUÁRIO</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{user.name}</div>
                <div className="muted" style={{ marginTop: 6 }}>{user.email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="muted">STATUS</div>
                <div style={{ fontWeight: 800, marginTop: 6 }}>{isSubscriber ? 'ASSINATURA ATIVA' : 'PLANO FREE'}</div>
              </div>
            </div>
          </div>

          {/* plan card */}
          <div className="card" style={{ marginTop: 12, padding: 16 }}>
            <div className="muted">PLANO ATUAL</div>
            <div style={{ fontWeight: 900, fontSize: 18, marginTop: 8 }}>{plan?.title ?? 'FREE'}</div>
            <div style={{ marginTop: 8, fontWeight: 800 }}>{plan?.price ?? 'R$ 0'}</div>
            {plan?.meta?.equivalentMonthly ? <div className="muted" style={{ marginTop: 6 }}>{plan.meta.equivalentMonthly} — <span className="muted">{plan.meta.savings}</span></div> : null}
            <div style={{ marginTop: 12 }}>
              {isFree ? (
                <a href="/plans" className="garage-cta">CONHECER O MOTION+</a>
              ) : (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => setManageOpen(v => !v)} className="ui-retry-btn" style={{color: 'black'}}>GERENCIAR ASSINATURA</button>
                  <a href="/stories" className="garage-cta" style={{ color: 'var(--color-shine)' }}>EXPLORAR BENEFÍCIOS</a>
                </div>
              )}
            </div>
            {manageOpen ? (
              <div style={{ marginTop: 12 }} className="card">
                <div style={{ fontWeight: 800 }}>Gerenciamento (simulado)</div>
                <div className="muted" style={{ marginTop: 8 }}>O gerenciamento de assinatura é simulado neste protótipo acadêmico. Não há cobrança real.</div>
              </div>
            ) : null}
          </div>

          {/* benefits */}
          <section style={{ marginTop: 12 }}>
            <h3 className="display">SEUS BENEFÍCIOS</h3>
            <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
              {(plan?.benefits ?? []).map(b => (
                <div key={b} className="card" style={{ padding: 12 }}>
                  <div style={{ fontWeight: 700 }}>{b}</div>
                </div>
              ))}
            </div>
          </section>

          {/* exclusive content showcase */}
          <section style={{ marginTop: 18 }}>
            <h3 className="display">CONTEÚDO MOTION+</h3>
            <p className="muted" style={{ marginTop: 6 }}>Uma curadoria das histórias exclusivas disponíveis para assinantes.</p>
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {loadingStories ? <div className="muted">Carregando...</div> : premiumStories.map(s => (
                <article key={s.id} className="card">
                  <a href={`/stories/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ width: '100%', height: 140, overflow: 'hidden' }} className="card-media"><img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: 12 }}>
                      <div className="story-category micro">{s.category}</div>
                      <div style={{ fontWeight: 800, marginTop: 6 }}>{s.title}</div>
                      <div className="muted" style={{ marginTop: 8 }}>{s.excerpt}</div>
                      <div style={{ marginTop: 12 }}>
                        {isFree ? <span className="meta" style={{ color: 'var(--color-shine)' }}>EXCLUSIVO</span> : <span className="meta" style={{ color: 'var(--color-shine)' }}>ACESSAR</span>}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </section>
        </section>

        <aside>
          <div className="card" style={{ padding: 12 }}>
            <div className="muted">SUA ASSINATURA</div>
            <div style={{ fontWeight: 800, marginTop: 6 }}>{plan?.title ?? 'FREE'}</div>
            <div className="muted" style={{ marginTop: 6 }}>{plan?.price ?? 'R$ 0'}</div>
            <div style={{ marginTop: 8 }} className="muted">Status: {user.subscriptionStatus}</div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'row', gap: 8 }}>
              <a href="/plans" className="ui-retry-btn" style={{ color: 'black', display: 'flex', alignItems: 'center' }}>CONHECER PLANOS</a>
              <button onClick={() => { logout(); nav('/') }} className="garage-cta" style={{ color: 'var(--color-shine)' }}>SAIR</button>
            </div>
          </div>

          {/* promotional area for FREE users */}
          {isFree ? (
            <div className="card" style={{ marginTop: 12, padding: 12 }}>
              <div style={{ fontWeight: 900 }}>DESBLOQUEIE O MOTION+</div>
              <div className="muted" style={{ marginTop: 8 }}>Acesse conteúdo premium, collections exclusivas e garage ilimitada.</div>
              <div style={{ marginTop: 12 }}><a href="/plans" className="garage-cta">ASSINAR MOTION+</a></div>
            </div>
          ) : null}

          {/* continue exploring */}
          <div className="card" style={{ marginTop: 12, padding: 12 }}>
            <div className="muted">AÇÕES</div>
            <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
              <a href="/stories" className="meta" style={{ color: 'var(--color-shine)', textDecoration: 'underline'}}>EXPLORAR STORIES</a>
              <a href="/cars" className="meta" style={{ color: 'var(--color-shine)', textDecoration: 'underline' }}>EXPLORAR CARROS</a>
              <a href="/collections" className="meta" style={{ color: 'var(--color-shine)', textDecoration: 'underline' }}>EXPLORAR COLEÇÕES</a>
              <a href="/discovery" className="meta" style={{ color: 'var(--color-shine)', textDecoration: 'underline' }}>DISCOVERY</a>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
