'use server';
import { signIn, signOut } from '@root/auth';

export const signInWithGoogle = async () => {
  await signIn('google', { callbackUrl: '/' });
};

export const signinWithGitHub = async () => {
  await signIn('github');
};

export const signout = async () => {
  await signOut();
};

export const signInWithCreds = async (
  email: string,
  password: string,
  redirect: boolean = false
) => {
  return await signIn('credentials', {
    email,
    password,
    redirect
  });
};
