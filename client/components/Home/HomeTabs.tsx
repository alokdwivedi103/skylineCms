"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

const TABS = [
  { name: "All", value: "all" },
  { name: "Recently Added", value: "recent" },
  { name: "Categories", value: "category" },
];

export default function HomeTabs() {
  const [selectedTab, setSelectedTab] = useState("All");
  return (
    <section className="w-full flex justify-center">
      <div className="bg-muted text-muted-foreground rounded-lg py-1 px-2">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "my-1 rounded-sm py-1 px-3 text-sm flex-shrink-0",
              selectedTab === tab.value && "bg-background text-primary"
            )}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </section>
  );
}
