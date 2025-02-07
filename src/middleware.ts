import { NextResponse, NextRequest } from 'next/server';
import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Expanded list of public routes
  const isPublicRoute = 
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/signup') ||
    req.nextUrl.pathname.startsWith('/product') ||
    req.nextUrl.pathname.startsWith('/contact') ||
    req.nextUrl.pathname === '/api/webhook' ||
    req.nextUrl.pathname.startsWith('/search');

  // If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For protected routes, check authentication
  const { userId } = await auth();
  if (!userId) {
    // Instead of redirecting, you might want to handle this in the frontend
    // This allows the Clerk sign-in modal to open on the same page
    return NextResponse.next();
  }

  // Allow access to authenticated users
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/'],
};