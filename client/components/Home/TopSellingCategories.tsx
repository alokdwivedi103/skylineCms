import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TOP_SELLING_CATEGORIES } from "@/constants/pages/HOME";

export default function TopSellingCategories() {
  return (
    <section className="text-center my-10">
      <h2 className="text-2xl font-semibold text-primaryColor">
        Top Selling Categories
      </h2>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-6">
        {TOP_SELLING_CATEGORIES.map(({ name, image, slug }) => (
          <Link
            href={`/category/${slug}`}
            key={name}
            className="text-center border border-gray-200 flex justify-between items-center p-1 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <div className="flex gap-4 h-full items-center">
              <Image
                alt={name}
                className="rounded-md w-16 h-14"
                height={100}
                width={100}
                src={image}
              />
              <span className="text-lg font-semibold">{name}</span>
            </div>
            <ChevronRight className="w-6 h-6 stroke-gray-600 stroke-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}
