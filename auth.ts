import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import clientPromise from '@lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GitHub,
    Google,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const client = await clientPromise
        const db = client.db() as any

        const user = await db
          .collection('users')
          .findOne({ email: credentials?.email })

        if (!user) {
          console.error('User not found')
          return null // or throw an error
        }

        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const bcrypt = require('bcryptjs')

        const passwordCorrect = await bcrypt.compare(
          credentials?.password,
          user?.password
        )

        if (passwordCorrect) {
          return {
            id: user?._id,
            name: user?.name,
            email: user?.email,
            address: user?.address,
            city: user?.city,
            postal_code: user?.postal_code,
            province: user?.province,
            phone: user?.phone,
          }
        }
        return null
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (trigger === 'update') {
        return { ...token, ...session }
      }
      return { ...token, user: user || token.user }
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        token: {
          sub: token.sub,
          iat: token.iat,
          exp: token.exp,
          jti: token.jti,
        },
        user: {
          ...(typeof token.user === 'object' ? token.user : {}),
          image: session.user?.image || '',
        },
      }
    },
  },
})
