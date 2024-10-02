import { headers } from "next/headers";
import { HomeIcon, LogInIcon, SidebarClose, SidebarOpen } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const SIDEBAR_LIST = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },
  {
    name: "Login",
    path: "/login",
    Icon: LogInIcon,
  },
];

export default function Sidebar() {
  console.log("changes")
  const url = headers().get("x-url");
  const filteredList = SIDEBAR_LIST.filter(item => item.path !== url);
  return (
    <Sheet>
      <SheetTrigger className="ml-2 lg:ml-0">
        <SidebarOpen className="h-5 w-5 hover:scale-125 hover:transition-all hover:duration-200 shrink-0 transition-transform duration-200" />
      </SheetTrigger>
      <SheetContent className="w-[16rem] pl-4 lg:pl-auto" side="left">
        <div className="mt-4">
        {filteredList.map(({ Icon, name, path }) => (
          <SheetHeader key={name}>
            <SheetTitle><Link className="flex gap-4 items-center my-2" href={path}><Icon className="w-4 h-4 shrink-0" />{name}</Link></SheetTitle>
          </SheetHeader>
        ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
