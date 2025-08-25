// Extend the Session type to include 'id' on user
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: number;
    accessToken?: string;
  }

  interface User {
    id: number;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    id?: number;
  }
}
