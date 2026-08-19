export type Car = {
  id: string
  slug: string
  name: string
  brand: string
  year: number
  image: string
  description?: string
  valueUsd?: number
  specs?: {
    engine?: string
    power?: string
    torque?: string
    transmission?: string
    drivetrain?: string
    acceleration?: string
    topSpeed?: string
  }
}

export type Brand = {
  id: string
  slug: string
  name: string
  logo?: string
  description?: string
}

export type Story = {
  id: string
  slug: string
  title: string
  category: string
  excerpt?: string
  image: string
  /**
   * Marca se o conteúdo é premium (acesso somente para assinantes MOTION+).
   * Opcional — não bloqueia nada, apenas sinaliza o conteúdo para futuros incrementos.
   */
  isPremium?: boolean
}

export type Collection = {
  id: string
  slug: string
  title: string
  description?: string
}

export type User = {
  id: string
  name: string
  /** email é opcional por enquanto — login não implementado neste incremento */
  email?: string
  /** referência ao plano atual do usuário (id de SubscriptionPlan) */
  planId?: string
  subscriptionStatus?: SubscriptionStatus
}

export type SubscriptionPlan = {
  id: string
  /** chave curta: free | monthly | annual */
  key: string
  title: string
  /** Preço apresentado (string para permitir formato local, ex: "R$ 19,90/mês") */
  price: string
  /** Benefícios listados para apresentação */
  benefits: string[]
  /** Indica qual ciclo de cobrança (monthly | annual | free) */
  billingCycle: 'monthly' | 'annual' | 'free'
  /** Marcar plano como popular (por exemplo: "Mais popular") */
  isPopular?: boolean
  /** Informação adicional opcional (economia etc.) */
  meta?: {
    equivalentMonthly?: string
    savings?: string
  }
}

export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | 'trial' | 'none'

export type GarageItem = { id: string; userId: string; carId: string }
