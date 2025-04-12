'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Category {
  id: number
  slug: string
  name: string
  description: string
  image: string
  banner: string
  stats: {
    books: string
    authors: string
    bestSellers: string
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category')
        if (!response.ok) {
          throw new Error('Failed to fetch categories')
        }
        const data = await response.json()
        setCategories(data.categories)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading categories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <Link
            href="/admin/categories/add"
            className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-primaryColor/90 transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Category</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={category.banner.includes('imagekit.io/tools/asset-public-link') 
                    ? JSON.parse(decodeURIComponent(category.banner.split('detail=')[1])).signedUrl 
                    : category.banner}                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primaryColor">{category.stats.books}</div>
                    <div className="text-sm text-gray-500">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primaryColor">{category.stats.authors}</div>
                    <div className="text-sm text-gray-500">Authors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primaryColor">{category.stats.bestSellers}</div>
                    <div className="text-sm text-gray-500">Best Sellers</div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-primaryColor hover:text-primaryColor/80"
                  >
                    View Category
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      // Add delete functionality here
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 