import React from 'react'

type Props = { message?: string; onRetry?: () => void }

export default function ErrorState({ message, onRetry }: Props){
  return (
    <main className="container placeholder-space ui-placeholder-root" role="alert">
      <div className="ui-placeholder-text">
        {message ?? 'Não foi possível carregar este conteúdo.'}
      </div>
      {onRetry && (
        <div className="ui-retry-wrap">
          <button className="ui-retry-btn" onClick={onRetry}>TENTAR NOVAMENTE</button>
        </div>
      )}
    </main>
  )
}
