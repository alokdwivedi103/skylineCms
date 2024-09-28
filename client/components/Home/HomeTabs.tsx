import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

const TABS = [
  {
    name: "All",
    value: "all",
    items: [
      { name: "New Tab", value: "newTab" },
      { name: "Old Tab", value: "oldTab" },
    ],
  },
  { name: "Recently Added", value: "recent", items: [
    { name: "New Tab", value: "newTab" },
    { name: "Old Tab", value: "oldTab" },
  ], },
  { name: "Categories", value: "category", items: [
    { name: "New Tab", value: "newTab" },
    { name: "Old Tab", value: "oldTab" },
  ], },
];

export default function HomeTabs() {
  const filteredTabs = TABS.filter((tab) => tab.items?.length);
  return (
    <Menubar className="w-fit mx-auto mt-4">
      {filteredTabs.map(({ name, value, items = [] }) => (
        <MenubarMenu key={value}>
          <MenubarTrigger>{name}</MenubarTrigger>
          <MenubarContent>
            {items.map(({ name, value }, index) => (
              <>
                <MenubarItem className="sm:w-16 w-20 lg:w-auto" key={value}>{name}</MenubarItem>
                {index !== items.length - 1 && <MenubarSeparator />}
              </>
            ))}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
