import React from 'react'
import Hero from '../sections/Hero'
import FeaturedCar from '../sections/FeaturedCar'
import Discovery from '../sections/Discovery'
import FeaturedStory from '../sections/FeaturedStory'
import GarageInvite from '../sections/GarageInvite'
import { getCars, getStories, getCollections, getFeaturedCar, getFeaturedStory } from '../data/repo'
import { DiscoverItem } from '../types'
import Loading from '../components/ui/Loading'
import ErrorState from '../components/ui/ErrorState'
import type { Car, Story, Collection } from '../data/models'

export default function Home(){
  const [cars, setCars] = React.useState<Car[]>([])
  const [stories, setStories] = React.useState<Story[]>([])
  const [collections, setCollections] = React.useState<Collection[]>([])
  const [featured, setFeatured] = React.useState<Car | undefined>(undefined)
  const [featuredStory, setFeaturedStory] = React.useState<Story | undefined>(undefined)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)

  const mountedRef = React.useRef(true)

  async function loadHomeData() {
    if (!mountedRef.current) return
    setLoading(true)
    setError(false)
    try {
      const [carsRes, storiesRes, collectionsRes, featuredRes, featuredStoryRes] = await Promise.all([
        getCars(), getStories(), getCollections(), getFeaturedCar(), getFeaturedStory()
      ])
      if (!mountedRef.current) return
      setCars(carsRes)
      setStories(storiesRes)
      setCollections(collectionsRes)
      setFeatured(featuredRes)
      setFeaturedStory(featuredStoryRes)
    } catch (err) {
      if (!mountedRef.current) return
      setError(true)
    } finally {
      if (!mountedRef.current) return
      setLoading(false)
    }
  }

  React.useEffect(() => {
    mountedRef.current = true
    loadHomeData()
    return () => { mountedRef.current = false }
  }, [])

  if (loading) return <Loading />
  if (error) return <ErrorState onRetry={() => { loadHomeData() }} />

  // restore: simplified home layout similar to prior design, keeping improved hero composition
  const discoveryItems: DiscoverItem[] = [
    { to: '/cars', label: 'CARROS', image: cars[0]?.image },
    { to: '/stories', label: 'HISTÓRIAS', image: stories[0]?.image },
    { to: '/brands', label: 'MARCAS', image: cars[1]?.image },
    { to: '/collections', label: 'COLEÇÕES', image: collections[0] ? cars[2]?.image : undefined }
  ]

  return (
    <div>
      <Hero />
      <section className="container section-space-large">
        {featured ? <FeaturedCar car={featured} /> : null}
      </section>
      <section className="section-space section-discovery">
        <div className="container"><Discovery items={discoveryItems} /></div>
      </section>
      <section className="container section-space-large">
        {featuredStory ? <FeaturedStory story={featuredStory} /> : null}
      </section>
      <section className="section-space section-garage">
        <div className="container"><GarageInvite /></div>
      </section>
    </div>
  )
}
