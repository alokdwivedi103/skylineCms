import { NextResponse, type NextRequest, userAgent } from 'next/server';

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  // const userAgent = requestHeaders.get('user-agent');
  // const isMobile = Boolean(userAgent?.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
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

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}