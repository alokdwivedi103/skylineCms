import { NextResponse, type NextRequest, userAgent } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  // Handle device detection and headers
  const requestHeaders = new Headers(request.headers);
  const { device } = userAgent(request);
  const isMobile = device.type === 'mobile';
  const url = new URL(request.url);
  const { origin } = url;
  const { pathname } = url;
  
  requestHeaders.set('x-url', request.url.replace(origin,''));
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  if (isMobile) {
    requestHeaders.set('x-mobile', 'true');
  }

  // Handle authentication for admin routes
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!) as { role: string };
      
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Return response with updated headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}