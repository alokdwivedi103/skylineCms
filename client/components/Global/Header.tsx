import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-[20] w-full bg-background text-secondary-foreground shadow-sn">
      <div className="container flex justify-between items-center py-2">
        <Sidebar />
        <Link
          className="flex items-center font-bold text-xl ml-20"
          href="/"
        >
          <Image alt="Logo" height={50} src="/logo.webp" width={50} />
          Skyline Publications
        </Link>

        <a className="text-primary-foreground bg-primary flex gap-2 items-center shadow-sm py-1.5 px-3 h-auto rounded-md" href='/login'>
          <LogOutIcon className="w-3 h-3 shrink-0"/>Logout
        </a>
      </div>
    </header>
  );
}
