import { fetchAuthors } from "@/services/fetchAuthors";
import Image from "next/image";
import { imageSrcHelper } from "@/utils/imageSrcHelper";

export default async function TopSellingAuthors() {
  const authors = await fetchAuthors();
  console.log(authors);
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold text-primaryColor my-6">
        Top Selling Authors
      </h2>
      <div className="flex flex-wrap gap-x-4 gap-y-11 px-4 lg:px-0 container justify-center">
        {authors.map((author) => (
          <div key={author.name}>
            <Image
              alt={author.name}
              className="w-28 h-28 object-cover hover:scale-110 transition-transform duration-300 rounded-full"
              height={100}
              src={imageSrcHelper(author.image)}
              width={100}
            />
            <div className="mt-4 text-lg font-medium">{author.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
