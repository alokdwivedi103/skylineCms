import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dbConnect from '@/lib/db'
import User from '@/models/User'

const NEXT_PUBLIC_JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string
if (!NEXT_PUBLIC_JWT_SECRET) {
  throw new Error('NEXT_PUBLIC_JWT_SECRET is not defined in environment variables')
}

export async function POST(req: Request) {
  try {
    await dbConnect()
    const { email, password } = await req.json()

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: '1d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user.toObject()

    // Create response with success message
    const response = NextResponse.json(
      { message: 'Login successful', user: userWithoutPassword },
      { status: 200 }
    )

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 1 day
      path: '/'
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error logging in' },
      { status: 500 }
    )
  }
} 