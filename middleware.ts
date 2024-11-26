import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || '';
  console.log('🚀 ~ middleware ~ secret:', secret);
  if (!secret) {
    console.error('AUTH_SECRET is not defined');
    return NextResponse.next(); // Allow traffic but log the issue
  }

  // @ts-expect-error - req.cookies is not defined in the NextRequest type
  const token = await getToken({
    req,
    secret
  });

  // if (process.env.NODE_ENV === 'development') {
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers);
  console.log('Request URL:', req.nextUrl.href);
  console.log('Token:', token);
  // }

  const url = req.nextUrl.clone();

  // Skip API routes
  if (url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next(); // Skip middleware for static files
  }

  // Exclude certain paths from authentication checks
  const excludedPaths = new Set(['/', '/login', '/403']);
  if (excludedPaths.has(url.pathname)) {
    return NextResponse.next();
  }

  console.log('🚀 ~ middleware ~ token:', token);
  console.log('🚀 ~ middleware ~ url:', url);

  // Check if the user is authenticated
  if (!token) {
    // Redirect unauthenticated users to the login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // For admin routes, check if the user has admin privileges
  if (url.pathname.startsWith('/admin')) {
    // @ts-expect-error - user is not defined in the token type
    if (!token?.user || token.user.role !== 'admin') {
      url.pathname = '/403';
      return NextResponse.rewrite(url);
    }
  }

  // Allow access to the requested page
  return NextResponse.next();
}
