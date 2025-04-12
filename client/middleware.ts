import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { userAgent } from 'next/server'

// List of public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/verify-admin',
]

// Function to check if a route is public
const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => path.startsWith(route))
}

// Function to check if a route is an API route
const isApiRoute = (path: string) => {
  return path.startsWith('/api/')
}

// Function to check if a route is a static file
const isStaticFile = (path: string) => {
  return /\.(jpg|jpeg|png|gif|ico|svg|css|js)$/.test(path)
}

export async function middleware(request: NextRequest) {
  // Handle device detection and headers
  const requestHeaders = new Headers(request.headers)
  const { device } = userAgent(request)
  const isMobile = device.type === 'mobile'
  const url = new URL(request.url)
  const { origin } = url
  const { pathname } = url

  requestHeaders.set('x-url', request.url.replace(origin, ''))
  requestHeaders.set('x-origin', origin)
  requestHeaders.set('x-pathname', pathname)

  if (isMobile) {
    requestHeaders.set('x-mobile', 'true')
  }

  // Allow public routes, API routes, and static files
  if (isPublicRoute(pathname) || isApiRoute(pathname) || isStaticFile(pathname)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Get token from cookies
  const token = request.cookies.get('token')?.value

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Add user info to request headers
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-user-role', payload.role)

    // Handle admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    // If token is invalid, redirect to login
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}