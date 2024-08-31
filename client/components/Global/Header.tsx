import Image from "next/image";
import Link from "next/link";

import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-[20] w-full bg-gray-200 text-secondary-foreground shadow-md">
      <div className="container flex justify-between items-center py-2">
        <Sidebar />
        <Link
          className="flex items-center font-bold text-xl"
          href="/"
        >
          <Image alt="Logo" height={50} src="/logo.webp" width={50} />
          Skyline Publications
        </Link>

        <a className="text-gray-200 bg-secondary-foreground py-2 px-3 h-auto rounded-md" href='/login'>
          Logout
        </a>
      </div>
    </header>
  );
}
