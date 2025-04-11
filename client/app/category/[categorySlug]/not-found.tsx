import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primaryColor mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">Category Not Found</h2>
        <p className="text-gray-600 mb-8">The category you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link 
          href="/"
          className="bg-primaryColor text-white px-6 py-3 rounded-md hover:bg-primaryColor/90 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 