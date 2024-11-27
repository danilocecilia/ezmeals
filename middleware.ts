import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const staticFileExtensions =
  /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|otf|map)$/;

export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || '';

  if (!secret) {
    console.error('AUTH_SECRET is missing. Allowing all traffic.');
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();

  // Allow static files, API routes, and Next.js internal files
  if (
    url.pathname.startsWith('/_next/') ||
    url.pathname.startsWith('/api/') ||
    url.pathname.match(staticFileExtensions)
  ) {
    return NextResponse.next();
  }

  // Allow Google OAuth callback
  if (url.pathname.startsWith('/api/auth/callback')) {
    return NextResponse.next();
  }

  // Allow public paths
  const publicPaths = new Set(['/', '/login', '/403']);
  if (publicPaths.has(url.pathname)) {
    return NextResponse.next();
  }

  // Authenticate user
  // @ts-expect-error - req.cookies is not defined in the NextRequest type
  const token = await getToken({ req, secret });
  if (!token) {
    url.pathname = '/login';
    url.searchParams.set('redirectTo', req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Additional role-based checks (if required)
  if (url.pathname.startsWith('/admin') && token.role !== 'admin') {
    url.pathname = '/403';
    return NextResponse.rewrite(url);
  }

  // Allow authenticated access
  return NextResponse.next();
}
