'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  banner: string;
  stats: {
    books: string;
    authors: string;
    bestSellers: string;
  };
}

export default function TopSellingCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryColor mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-12 w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primaryColor mb-12">Top Selling Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 w-full">
                <Image
                  src={category.banner.includes('imagekit.io/tools/asset-public-link') 
                    ? JSON.parse(decodeURIComponent(category.banner.split('detail=')[1])).signedUrl 
                    : category.banner}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4 h-20 overflow-y-auto">{category.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primaryColor">{category.stats.books}</div>
                    <div className="text-sm text-gray-500">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primaryColor">{category.stats.authors}</div>
                    <div className="text-sm text-gray-500">Authors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primaryColor">{category.stats.bestSellers}</div>
                    <div className="text-sm text-gray-500">Best Sellers</div>
                  </div>
                </div>
                
                <Link 
                  href={`/category/${category.slug}`}
                  className="block w-full text-center bg-primaryColor text-white py-2 rounded-md hover:bg-primaryColor/90 transition-colors duration-300"
                >
                  Explore Category
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
