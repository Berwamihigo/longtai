import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminSession = request.cookies.get('adminSession');
  const { pathname } = request.nextUrl;

  // If trying to access dashboard routes
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    if (!adminSession) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL('/dashboard/login', request.url));
    }
  }

  // If trying to access login page while already logged in
  if (pathname === '/dashboard/login' && adminSession) {
    // Redirect to dashboard if already logged in
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
}; 