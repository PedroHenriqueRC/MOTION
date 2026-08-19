import React from 'react'
import { Link } from 'react-router-dom'
import type { Story } from '../../data/models'

export default function Paywall({ story, userIsFree }: { story: Story; userIsFree: boolean }){
  return (
    <section className="container section-space" aria-label="Paywall">
      <div style={{ display: 'grid', gap: 18, alignItems: 'center', textAlign: 'center' }}>
        <div className="micro muted">MOTION+</div>
        <h2 className="display">CONTEÚDO EXCLUSIVO</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 680, maxWidth: '100%', borderRadius: 8, overflow: 'hidden' }}>
            <img src={story.image} alt={story.title} style={{ width: '100%', height: '360px', objectFit: 'cover' }} />
          </div>
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h3 style={{ marginTop: 6 }}>{story.title}</h3>
          <p className="muted" style={{ marginTop: 8 }}>Algumas histórias vão além do que está disponível gratuitamente. Torne-se assinante para acessar conteúdos exclusivos, análises aprofundadas e experiências editoriais especiais.</p>
          {userIsFree ? (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/plans" className="garage-cta">ASSINAR MOTION+</Link>
              <Link to="/stories" className="ui-retry-btn" style={{ borderColor: 'var(--color-border-light)' }}>VOLTAR PARA STORIES</Link>
            </div>
          ) : (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="garage-cta">ENTRAR</Link>
              <Link to="/plans" className="ui-retry-btn" style={{ borderColor: 'var(--color-border-light)', alignContent: 'center', alignItems: 'center' }}>CONHECER O MOTION+</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
