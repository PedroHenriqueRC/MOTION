import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import Garage from './pages/Garage'
import Stories from './pages/Stories'
import StoryDetail from './pages/StoryDetail'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import Brands from './pages/Brands'
import BrandDetail from './pages/BrandDetail'
import Collections from './pages/Collections'
import CollectionDetail from './pages/CollectionDetail'
import CollectionCreate from './pages/CollectionCreate'
import Discovery from './pages/Discovery'
import Search from './pages/Search'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="discovery" element={<Discovery />} />
        <Route path="cars" element={<Cars />} />
        <Route path="cars/:slug" element={<CarDetail />} />
        <Route path="stories" element={<Stories />} />
        <Route path="stories/:slug" element={<StoryDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:slug" element={<BrandDetail />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/create" element={<CollectionCreate />} />
        <Route path="collections/:slug" element={<CollectionDetail />} />
        <Route path="garage" element={<Garage />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  )
}
