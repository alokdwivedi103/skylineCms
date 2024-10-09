import { TOP_SELLING_CATEGORIES } from "@/constants/pages/HOME";
import { SearchIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: { categorySlug: string };
}) {
  const category = TOP_SELLING_CATEGORIES.find(
    (category) => category.slug === params.categorySlug
  );
  if (!category) {
    notFound();
  }
  return <section className="h-screen">
    <div className="container">This page is {params.categorySlug} and is under creation. <p className="flex gap-2"> Come again another time <SearchIcon className="w-5 h-5 stroke-yellow-400"/></p></div></section>;
}
