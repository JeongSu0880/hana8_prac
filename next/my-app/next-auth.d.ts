import { DefaultSession } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export type X = JWT;

declare module 'next-auth' {
  interface Session {
    user: {
      isadmin?: boolean;
    } & DefaultSession['user'];
  } // 기존의 세션의 유저 타입에 어드민 추가

  interface User {
    passwd?: string;
    isadmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isadmin?: boolean;
  }
}
