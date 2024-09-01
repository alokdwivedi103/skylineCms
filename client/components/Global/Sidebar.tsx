import { headers } from "next/headers";
import { HomeIcon, LogInIcon, SidebarClose, SidebarOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_LIST = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Login",
    path: "/login",
    icon: LogInIcon,
  },
];

export default function Sidebar() {
  const url = headers().get('x-url');
  return (
    <div className="relative">
      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />

      <label
        htmlFor="sidebar-toggle"
        className="fixed top-4 left-4 z-30 p-2 text-secondary-foreground rounded-md cursor-pointer peer-checked:hidden"
      >
        <SidebarOpen className="h-5 w-5 hover:scale-125 hover:transition-all hover:duration-200 shrink-0 transition-transform duration-200" />
      </label>

      <div className="fixed top-0 left-0 z-20 h-full w-64 bg-background text-primary transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-primary text-[22px] ml-2 font-bold">Discover</h2>
            <label
              htmlFor="sidebar-toggle"
              className="text-primary cursor-pointer"
            >
              <SidebarClose className="h-5 w-5 hover:scale-125 hover:transition-all hover:duration-200 shrink-0 transition-transform duration-200" />
            </label>
          </div>
          <nav className="mt-6">
            <ul className="font-medium text-foreground">
              {SIDEBAR_LIST.map((sidebar) => (
                <li key={sidebar.path}>
                  <a href={sidebar.path} className={cn("flex gap-3 items-center px-3 hover:bg-accent hover:!text-accent-foreground py-2 hover:rounded-md", sidebar.path === url && 'bg-accent !text-accent-foreground rounded-md')}>
                    <sidebar.icon className="w-4 h-4 shrink-0" /> {sidebar.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-black opacity-50 z-10 hidden peer-checked:block"
      />
    </div>
  );
}
