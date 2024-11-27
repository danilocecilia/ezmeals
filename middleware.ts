import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const staticFileExtensions =
  /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|otf|map)$/;

// Define your public and protected routes
const PUBLIC_ROUTES = new Set([
  '/',
  '/login',
  '/register',
  '/forgot-password',
  '/403'
]);

const PROTECTED_ROUTES = new Set(['/profile', '/admin', '/checkout']);

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const secret = process.env.AUTH_SECRET || '';
  console.log('🚀 ~ middleware ~ secret:', secret);
  if (!secret) {
    console.error('AUTH_SECRET is not defined');
    return NextResponse.next(); // Allow traffic but log the issue
  }

  // @ts-expect-error - req.cookies is not defined in the NextRequest type
  const token = await getToken({
    req,
    secret,
    cookieName: '__Secure-authjs.session-token'
  });

  // if (process.env.NODE_ENV === 'development') {
  console.log('Cookies:', req.cookies);
  console.log('Headers:', req.headers);
  console.log('Request URL:', req.nextUrl.href);
  console.log('Token:', token);
  console.log('Request protocol:', req.nextUrl.protocol);
  // }

  // Allow static files and internal API routes
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.match(staticFileExtensions)
  ) {
    return NextResponse.next();
  }

  // Allow OAuth callback (Google Auth)
  if (url.pathname.startsWith('/api/auth/callback')) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTES.has(url.pathname)) {
    return NextResponse.next();
  }

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

  if (!token && PROTECTED_ROUTES.has(url.pathname)) {
    console.log(
      `Redirecting unauthenticated user from ${url.pathname} to /login`
    );
    url.pathname = '/login';
    url.searchParams.set('redirectTo', req.nextUrl.pathname); // Preserve original path for redirect
    return NextResponse.redirect(url);
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
      console.log('User is not an admin');
      url.pathname = '/403';
      return NextResponse.rewrite(url);
    }
  }

  // Allow access to the requested page
  return NextResponse.next();
}
