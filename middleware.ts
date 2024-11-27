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

  // Log the request for debugging
  console.log('Processing URL:', url.pathname);

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

  // Handle public routes
  if (PUBLIC_ROUTES.has(url.pathname)) {
    return NextResponse.next();
  }

  // Authenticate for protected routes
  // @ts-expect-error - req.cookies is not defined in the NextRequest type
  const token = await getToken({ req, secret });
  console.log('🚀 ~ middleware ~ token:', token);
  if (!token && PROTECTED_ROUTES.has(url.pathname)) {
    console.log(
      `Redirecting unauthenticated user from ${url.pathname} to /login`
    );
    url.pathname = '/login';
    url.searchParams.set('redirectTo', req.nextUrl.pathname); // Preserve original path for redirect
    return NextResponse.redirect(url);
  }

  // Role-based access for admin
  if (url.pathname.startsWith('/admin') && token?.role !== 'admin') {
    console.log(
      'Access denied: Non-admin user attempting to access admin page.'
    );
    url.pathname = '/403';
    return NextResponse.rewrite(url);
  }

  // Allow the request to proceed
  return NextResponse.next();
}
