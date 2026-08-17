import React from 'react'

export default function EmptyState({ message }: { message?: string }){
  return (
    <div className="container placeholder-space ui-placeholder-root">
      <div className="ui-placeholder-text">{message ?? 'Nenhum conteúdo disponível.'}</div>
    </div>
  )
}
