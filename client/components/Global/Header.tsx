import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { LogOutIcon } from "lucide-react";

import Sidebar from "./Sidebar";

export default function Header() {
  return (
    <header className="sticky top-0 z-[20] w-full bg-background text-secondary-foreground shadow-sn">
      <div className="lg:container flex justify-between items-center py-2">
        <Sidebar role={headers().get('x-user-role') || ''} userId={headers().get('x-user-id') || ''} />
        <Link
          className="flex items-center font-bold lg:text-xl lg:ml-20"
          href="/"
        >
          <Image alt="Logo" className="w-10 h-10 lg:size-12" height={50} src="/logo.webp" width={50} />
          Skyline Publications
        </Link>

        <a className="mr-1 lg:text-primary-foreground lg:bg-primary flex gap-2 items-center shadow-sm lg:py-1.5 lg:px-3 h-auto rounded-md" href='/login'>
          <LogOutIcon className="lg:size-3 size-5 shrink-0"/>
          {headers().get('x-mobile') !== 'true' && <span>Logout</span>}
        </a>
      </div>
    </header>
  );
}
