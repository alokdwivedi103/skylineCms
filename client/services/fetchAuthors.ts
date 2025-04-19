export type Author = {
  _id: string;
  name: string;
  image: string;
};

export const fetchAuthors = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/authors`);
    const data = await response.json();
    return data as Author[];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [] as Author[];
  }
};
