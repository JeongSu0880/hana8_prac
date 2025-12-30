import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: '이메일', type: 'email', placeholder: 'user@mail.com' },
        passwd: {
          label: 'Password',
          type: 'password',
          placeholder: 'password...',
        },
      },
      async authorize(credentials) {
        console.log('🚀 ~ credentials:', credentials);
        const { email, passwd } = credentials;
        return {
          id: '1',
          email: email as string,
          name: 'HONG',
          passwd: passwd as string,
        };
      },
    }),
    Google, //여기의 옵션? 으로
    Github,
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('🚀 ~ account:', account);
      // 여기서 oauth그냥 이메일 없으면 ㅇ인서트!
      // 추가 정보 받고 싶으면 어쩔 수 없이 리다이렉트!를 하는데
      // 요즘에는 가입이 간단해야해서..
      // console.log('🚀 signIn - profile:', profile);
      console.log('🚀 signIn - user:', user);
      if (account?.provider === 'credentials') {
        if (user.email === 'jade@gmail.com')
          throw makeAuthError('EmailSignInError', 'Not Exists Email!');

        if (!user.passwd) return false;
      }
      return true;
    },
    async jwt({ token, user, trigger }) {
      // console.log('🚀 jwt - token:', token);
      // console.log('🚀 jwt - user:', user);
      if (trigger) console.log('🚀 jwt - trigger:', trigger);
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // 여기서 jwt는 알아서 ㅓ복호화하고 또 암호화한거임. 그냥 알아서 다 하는 거임.
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.email = user.email;
        session.user.name = user.name;
      }
      return session;
    },
  },
  pages: {
    // signIn: '/sign',
    error: '/sign/error',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
});

const makeAuthError = (type: AuthError['type'], message?: string) => {
  const err = new AuthError(message);
  err.type = type;
  return err;
};

//각각의 함수들이 언젱 ㅓ떤 용도로 사용되는지 좀 명확하게 공부하기

//jwt를 요청할 때마다 30분씩 연장하는구나...
