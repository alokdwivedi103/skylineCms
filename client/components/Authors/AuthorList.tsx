import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { imageSrcHelper } from "@/utils/imageSrcHelper";

interface Author {
  _id: string;
  name: string;
  bio: string;
  image: string;
  slug: string;
}

interface AuthorListProps {
  authors: Author[];
  onEdit: (author: Author) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export default function AuthorList({
  authors,
  onEdit,
  onDelete,
  isAdmin,
}: AuthorListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <div
          key={author._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Link href={`/author/${author.slug}`}>
            <div className="relative h-48">
              <Image
                src={imageSrcHelper(author.image)}
                alt={author.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          <div className="p-4">
            <Link href={`/author/${author.slug}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                {author.name}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-3">{author.bio}</p>
            {isAdmin && (
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(author)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(author._id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
