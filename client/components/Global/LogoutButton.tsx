'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const { logout } = useAuth()

  return (
    <Button
      variant="ghost"
      className="flex items-center space-x-2"
      onClick={logout}
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  )
} 