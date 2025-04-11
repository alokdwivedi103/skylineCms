import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

// Simple JWT implementation for Edge Runtime
const encodeBase64 = (str: string) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
    return String.fromCharCode(parseInt(p1, 16))
  }))
}

const createJWT = (payload: any, secret: string) => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  }

  const encodedHeader = encodeBase64(JSON.stringify(header))
  const encodedPayload = encodeBase64(JSON.stringify(payload))
  const signature = encodeBase64(secret) // This is a simplified version, in production use a proper HMAC

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

export async function POST(req: Request) {
  try {
    // Ensure database connection
    await dbConnect()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = createJWT(
      {
        userId: user._id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET || 'your-secret-key'
    )

    // Set token in cookie
    cookies().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user.toObject()

    return NextResponse.json({
      user: userWithoutPassword
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 