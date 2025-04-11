import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/models/User'

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string
if (!NEXT_PUBLIC_JWT_SECRET) {
  throw new Error('NEXT_PUBLIC_JWT_SECRET is not defined in environment variables')
}

export async function GET(req: Request) {
  try {
    await dbConnect()

    // Get token from cookie
    const token = req.headers.get('cookie')?.split('token=')[1]?.split(';')[0]
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, NEXT_PUBLIC_JWT_SECRET) as { userId: string, role: string }
    
    // Check if user exists and is admin
    const user = await User.findById(decoded.userId)
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    return NextResponse.json({ authorized: true })
  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
} 