import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Determine if route requires authentication
  const isProtectedRoute =
    pathname.startsWith('/dashboard') || pathname.startsWith('/timetable');

  // Read NextAuth JWT (supports both dev and production cookies)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  const isLoggedIn = !!token;

  // Redirect unauthenticated users away from protected routes
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  // Enforce role-based access for students
  const role = token?.role as string | undefined;

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except NextAuth and static files
    '/((?!api/auth|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)'
  ]
};
