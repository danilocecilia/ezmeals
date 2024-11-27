import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const staticFileExtensions =
  /\.(png|jpg|jpeg|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|otf|map)$/;

function hasRequiredRole(token: unknown, requiredRole: string): boolean {
  // @ts-expect-error - user is not defined in the unknown type
  return token?.user?.role === requiredRole;
}

// Middleware function
export async function middleware(req: NextRequest) {
  const secret = process.env.AUTH_SECRET || '';
  const env = process.env.NODE_ENV;

  if (!secret) {
    console.error(
      'AUTH_SECRET is missing. Middleware will allow traffic by default.'
    );
    return NextResponse.next();
  }

  try {
    // @ts-expect-error - req.cookies is not defined in the NextRequest type
    const token = await getToken({ req, secret });
    const url = req.nextUrl.clone();

    // Log request details only in development mode
    if (env === 'development') {
      console.log('Request URL:', req.nextUrl.href);
      console.log('Cookies:', req.cookies);
      console.log('Headers:', req.headers);
      console.log('Token:', token);
    }

    // Exclude requests for static files, API routes, and Next.js-specific paths
    if (
      url.pathname.startsWith('/_next/') ||
      url.pathname.startsWith('/api/') ||
      url.pathname.match(staticFileExtensions)
    ) {
      return NextResponse.next();
    }

    // Specifically allow Google OAuth callback
    if (url.pathname.startsWith('/api/auth/callback')) {
      return NextResponse.next();
    }

    // Exclude certain public paths from authentication checks
    const publicPaths = new Set(['/', '/login', '/403']);
    if (publicPaths.has(url.pathname)) {
      return NextResponse.next();
    }

    // Redirect unauthenticated users to the login page
    if (!token) {
      url.pathname = '/login';
      url.searchParams.set('redirectTo', req.nextUrl.pathname); // Preserve intended page
      return NextResponse.redirect(url);
    }

    // Role-based access control for admin routes
    if (url.pathname.startsWith('/admin') && !hasRequiredRole(token, 'admin')) {
      url.pathname = '/403';
      return NextResponse.rewrite(url);
    }

    // Allow access to all other routes
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);

    // Allow traffic in case of an error to prevent service interruption
    return NextResponse.next();
  }
}
