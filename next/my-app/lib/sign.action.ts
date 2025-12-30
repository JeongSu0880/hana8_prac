'use server';
import { signIn } from 'next-auth/react';
import { signOut } from './auth';

export type Provider = 'google' | 'github' | 'credentials';

export type EmailPasswd = { email: string; passwd: string };

export type ValidError<T> = {
  error: {
    [k in keyof T]: string;
  };
  data: string;
};

export const logout = async () => {
  await signOut({ redirectTo: '/sign' });
};

const login = async (provider: Provider, formData: FormData) => {
  const redirectTo = formData.get('redirectTo') as string;
  await signIn(provider, { redirectTo });
};
export const loginGoogle = async (formData: FormData) =>
  login('google', formData);
export const loginGithub = async (formData: FormData) =>
  login('github', formData);
export const loginEmail = async (formData: FormData) => {
  const email = formData.get('email');
  const passwd = formData.get('passwd');
  const data = { email, passwd };
  try {
    if (!email) return [{ error: { email: 'Input the email!' }, data }];
    if (!passwd) return [{ error: { passwd: 'Input the password!' }, data }];

    await signIn('credentials', { redirect: false, email, passwd });
  } catch (err) {}
};
