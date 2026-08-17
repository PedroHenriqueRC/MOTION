import { cars, brands, stories, collections } from './mock'
import type { Car, Brand, Story, Collection } from './models'

export function getCars(): Promise<Car[]> { return Promise.resolve(cars) }
export function getCarBySlug(slug: string): Promise<Car | undefined> { return Promise.resolve(cars.find(c => c.slug === slug)) }

export function getBrands(): Promise<Brand[]> { return Promise.resolve(brands) }
export function getBrandBySlug(slug: string): Promise<Brand | undefined> { return Promise.resolve(brands.find(b => b.slug === slug)) }

export function getStories(): Promise<Story[]> { return Promise.resolve(stories) }
export function getStoryBySlug(slug: string): Promise<Story | undefined> { return Promise.resolve(stories.find(s => s.slug === slug)) }

export function getCollections(): Promise<Collection[]> { return Promise.resolve(collections) }
export function getCollectionBySlug(slug: string): Promise<Collection | undefined> { return Promise.resolve(collections.find(c => c.slug === slug)) }

export function getFeaturedCar(): Promise<Car | undefined> { return Promise.resolve(cars[0]) }
export function getFeaturedStory(): Promise<Story | undefined> { return Promise.resolve(stories[0]) }
