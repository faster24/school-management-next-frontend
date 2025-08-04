import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value || // localhost
    request.cookies.get('__Secure-next-auth.session-token')?.value; // production

  const isLoggedIn = !!sessionToken;
  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = pathname.startsWith('/dashboard');

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
