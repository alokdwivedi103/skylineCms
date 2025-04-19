import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import dbConnect from '@/lib/db'
import Author from '@/models/Author'

interface AuthorPageProps {
  params: {
    slug: string
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  await dbConnect()
  
  const author = await Author.findOne({ slug: params.slug })
    .populate('books')
    .exec()

  if (!author) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative w-full md:w-1/3 h-96">
            <Image
              src={author.image}
              alt={author.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-4">{author.name}</h1>
            <p className="text-gray-600 mb-6 whitespace-pre-line">{author.bio}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Books by {author.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {author.books.map((book: any) => (
              <Link
                key={book._id}
                href={`/books/${book.slug}`}
                className="group"
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">₹{book.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 