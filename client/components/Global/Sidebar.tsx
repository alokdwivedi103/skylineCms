const SIDEBAR_LIST = [
  {
    name: "Home",
    path: "/",
    icon: "",
  },
  {
    name: "Login",
    path: "/login",
    icon: "",
  },
];

export default function Sidebar() {
  return (
    <div className="relative">
      <input type="checkbox" id="sidebar-toggle" className="hidden peer" />

      <label
        htmlFor="sidebar-toggle"
        className="fixed top-4 left-4 z-30 p-2 text-secondary-foreground rounded-md cursor-pointer peer-checked:hidden"
      >
        ☰
      </label>

      <div className="fixed top-0 left-0 z-20 h-full w-64 bg-gray-800 text-white transform -translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-2xl font-bold">Sidebar</h2>
            <label
              htmlFor="sidebar-toggle"
              className="text-white cursor-pointer"
            >
              X
            </label>
          </div>
          <nav className="mt-6">
            <ul className="space-y-4">
              {SIDEBAR_LIST.map((sidebar) => (
                <li key={sidebar.path}>
                  <a href={sidebar.path} className="hover:text-gray-300">
                    {sidebar.name}
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
