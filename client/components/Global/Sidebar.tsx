'use client'

import { useState } from 'react'
import { HomeIcon, SidebarOpen } from "lucide-react";
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/context/AuthContext';

const SIDEBAR_LIST = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },
];

export default function Sidebar({ role, userId }: { role: string, userId: string }) {
  const auth = useAuth();
  const isAdmin = auth.user?.role === "admin";

  return (
    <Sheet>
      <SheetTrigger className="ml-2 lg:ml-0">
        <SidebarOpen className="h-5 w-5 hover:scale-125 hover:transition-all hover:duration-200 shrink-0 transition-transform duration-200" />
      </SheetTrigger>
      <SheetContent className="w-[16rem] pl-4 lg:pl-auto" side="left">
        <div className="mt-4">
          {SIDEBAR_LIST.map(({ Icon, name, path }) => (
            <SheetHeader key={name}>
              <SheetTitle>
                <Link 
                  className="flex gap-4 items-center my-2"
                  href={path}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {name}
                </Link>
              </SheetTitle>
            </SheetHeader>
          ))}
          
          {isAdmin && (
            <>
              <Link
                href="/admin/categories"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Categories</span>
              </Link>
              <Link
                href="/admin/categories/add"
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Category</span>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
