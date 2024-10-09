import Image from "next/image"

const AUTHORS = [
    {
        name: "Girish Engine",
        image: "/images/Home/author1.webp",
    },
    {
        name: "Maheshara",
        image: "/images/Home/author1.webp",
    },
    {
        name: "Nagesh Kumar",
        image: "/images/Home/author1.webp",
    },
    {
        name: "Anujan",
        image: "/images/Home/author1.webp",
    }
]

export default function TopSellingAuthors() {
  return (
    <section className="text-center">
        <h2 className="text-2xl font-bold text-primaryColor my-6">Top Selling Authors</h2>
        <div className="flex flex-wrap gap-y-11">
          {AUTHORS.map(author => (
            <div key={author.name} className="mx-auto">
              <Image alt={author.name} className="w-24 h-24 object-cover hover:scale-125 transition-all duration-300" height={100} src={author.image} width={100} />
              <div className="mt-4 text-lg font-medium">{author.name}</div>
            </div>
          ))}
        </div>
    </section>
  )
}
