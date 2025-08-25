import { LoginUser } from '@/services/auth.services';
import { NextAuthOptions, SessionStrategy } from 'next-auth';
import Credential from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credential({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error('Input fields are required!');
        }

        const loginResponse = await LoginUser({
          email: credentials.email,
          password: credentials.password
        });

        if (!loginResponse) {
          throw new Error('Invalid login credentials');
        }
        // Return user object with required properties
        return {
          id: loginResponse.user.id,
          email: loginResponse.user.email,
          name: loginResponse.user.name,
          accessToken: loginResponse.token
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in' // Redirect errors to sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = typeof user.id === 'number' ? user.id : Number(user.id);
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.accessToken = token.accessToken as string;
        session.id = token.id as number;
      }
      return session;
    }
  }
};
