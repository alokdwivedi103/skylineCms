'use client'

import { useEffect, useState } from 'react'
import { HomeIcon, LogInIcon, LogOutIcon, SidebarClose, SidebarOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from 'next/link'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SIDEBAR_LIST = [
  {
    name: "Home",
    path: "/",
    Icon: HomeIcon,
  },
];

export default function Sidebar({ headers }: { headers: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getToken = () => {
      const cookies = document.cookie.split(';')
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=')
        if (name === 'token') {
          return value
        }
      }
      return null
    }

    const token = getToken()

    if (token) {
      try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const payload = JSON.parse(atob(base64))
        
        setIsAuthenticated(true)
        if (payload.role === 'admin') {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error('Error parsing token:', error)
      }
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
      setIsAuthenticated(false)
      setIsAdmin(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

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

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 w-full"
            >
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
            >
              <LogInIcon className="w-5 h-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
