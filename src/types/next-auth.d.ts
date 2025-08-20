// Extend the Session type to include 'id' on user
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      email?: string;
      name?: string;
    };
    accessToken?: string;
  }

  interface User {
    id: number;
    email?: string;
    name?: string;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    id?: string;
  }
}
