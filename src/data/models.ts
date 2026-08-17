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
}

export type Collection = {
  id: string
  slug: string
  title: string
  description?: string
}

export type User = { id: string; name: string }

export type GarageItem = { id: string; userId: string; carId: string }
