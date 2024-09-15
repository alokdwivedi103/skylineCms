import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const userAgentHeader = requestHeaders.get('user-agent') || '';

  // Simple regex matching for detecting mobile devices
  const isMobile = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgentHeader);

  const url = new URL(request.url);
  const { origin, pathname } = url;

  // Set custom headers
  requestHeaders.set('x-url', request.url.replace(origin, ''));
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);

  if (isMobile) {
    requestHeaders.set('x-mobile', 'true');
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
