import type { User } from '../data/models'

// central helper to decide premium access
export function hasPremiumAccess(user: User | null | undefined): boolean {
  if (!user) return false
  const plan = user.planId
  const active = user.subscriptionStatus === 'active'
  if (!active) return false
  return plan === 'p_monthly' || plan === 'p_annual'
}
