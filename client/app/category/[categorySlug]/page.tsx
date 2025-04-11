import { notFound } from "next/navigation";
import Image from "next/image";

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

async function getCategory(slug: string): Promise<Category | null> {
  try {
    // Use relative URL if NEXT_PUBLIC_API_URL is not set
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
    const apiUrl = `${baseUrl}/api/category?slug=${slug}`;

    const res = await fetch(apiUrl, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error response:", {
        status: res.status,
        statusText: res.statusText,
        body: errorText,
      });
      return null;
    }

    const data = await res.json();

    // Handle both direct category response and wrapped category response
    const category = data.category || data;
    if (!category || !category.name) {
      console.error("Invalid category data:", data);
      return null;
    }

    return category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = await getCategory(params.categorySlug);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-64 md:h-96">
        <Image
          src={
            category.banner.includes("imagekit.io/tools/asset-public-link")
              ? JSON.parse(
                  decodeURIComponent(category.banner.split("detail=")[1])
                ).signedUrl
              : category.banner
          }
          alt={category.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {category.name}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 mb-8">{category.description}</p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primaryColor">
                  {category.stats.books}
                </div>
                <div className="text-sm text-gray-500">Books</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primaryColor">
                  {category.stats.authors}
                </div>
                <div className="text-sm text-gray-500">Authors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primaryColor">
                  {category.stats.bestSellers}
                </div>
                <div className="text-sm text-gray-500">Best Sellers</div>
              </div>
            </div>

            {/* Add your books/authors list here */}
          </div>
        </div>
      </div>
    </div>
  );
}
