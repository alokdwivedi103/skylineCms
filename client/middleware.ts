import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userAgent } from "next/server";

// List of public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/verify-admin",
];

function isPublicRoute(path: string) {
  return publicRoutes.some((route) => path.startsWith(route));
}

function isApiRoute(path: string) {
  return path.startsWith("/api/");
}

function isStaticFile(path: string) {
  return /\.(jpg|jpeg|png|gif|ico|svg|css|js|webp)$/.test(path) || path.startsWith('/_next/image');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  const { device } = userAgent(request);
  const isMobile = device.type === "mobile";
  const url = new URL(request.url);
  const { origin } = url;

  console.log(request.url, "request.url");

  requestHeaders.set("x-url", request.url.replace(origin, ""));
  requestHeaders.set("x-origin", origin);
  requestHeaders.set("x-pathname", pathname);

  if (isMobile) {
    requestHeaders.set("x-mobile", "true");
  }

  if(request.url.includes("/login") || request.url.includes("/register")) {
    const response = NextResponse.next();
    response.cookies.delete("token");
  }
  // Allow public routes, API routes, and static files
  if (
    isPublicRoute(pathname) ||
    isApiRoute(pathname) ||
    isStaticFile(pathname)
  ) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Get token from cookie
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify token
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Add user info to headers
    requestHeaders.set("x-user-id", payload.userId);
    requestHeaders.set("x-user-role", payload.role);

    // Protect admin routes
    if (pathname.startsWith("/admin") && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Get device info
    const { device } = userAgent(request);
    const isMobile = device.type === "mobile";

    // Add device info to headers
    requestHeaders.set("x-mobile", isMobile.toString());

    // Return response with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
