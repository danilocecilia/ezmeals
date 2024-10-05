// serverAuth.ts
import { auth } from '@root/auth';

export const getSession = async () => {
  return await auth();
};
