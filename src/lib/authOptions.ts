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
        //Test credentials
        const user = {
          id: '1',
          email: 'demo@gmail.com',
          password: 'demo123'
        };
        const { email, password } = credentials;

        //Replace with actually api here and check if user exists
        if (email !== user.email) {
          throw new Error('User not found!');
        }
        if (password !== user.password) {
          throw new Error('Incorrect password!');
        }

        return user;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
};
