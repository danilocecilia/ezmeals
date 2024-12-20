import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@lib/mongodb';
import { Db } from 'mongodb';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
    verifyRequest: '/login',
    newUser: '/register'
  },
  session: {
    strategy: 'jwt'
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Secure-authjs.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'strict',
  //       secure: process.env.NODE_ENV === 'production', // Ensure this is true in production,
  //       domain: 'ezmeals.vercel.app' // Your production domain
  //     }
  //   }
  // },
  providers: [
    GitHub,
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db() as Db;

        const user = await db
          .collection('users')
          .findOne({ email: credentials?.email });

        if (!user) {
          console.error('User not found');
          return null; // or throw an error
        }

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const bcrypt = require('bcryptjs');

        const passwordCorrect = await bcrypt.compare(
          credentials?.password,
          user?.password
        );

        if (passwordCorrect) {
          return {
            id: user?._id.toString(),
            name: user?.name,
            email: user?.email,
            address: user?.address,
            city: user?.city,
            postal_code: user?.postal_code,
            province: user?.province,
            phone: user?.phone,
            image: user?.image,
            role: user?.role
          };
        }
        return null;
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session };
      }
      return { ...token, user: user || token.user };
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        token: {
          sub: token.sub,
          iat: token.iat,
          exp: token.exp,
          jti: token.jti
        },
        user: {
          ...(typeof token.user === 'object' ? token.user : {}),
          image: session.user?.image || ''
        }
      };
    }
    // Define custom redirection logic for different scenarios
    // async redirect({ url, baseUrl }) {
    //   console.log('Redirecting to:', url);
    //   console.log('Base URL:', baseUrl);
    //   // Check if the URL is a relative path
    //   if (url.startsWith('/')) {
    //     // Redirect to the requested relative URL within the same site
    //     return `${baseUrl}${url}`;
    //   }

    //   // Allow redirection to URLs from the same origin (domain)
    //   if (new URL(url).origin === baseUrl) {
    //     return url;
    //   }

    //   // If no valid redirect option is found, default to the base URL
    //   return baseUrl;
    // }
  }
});
