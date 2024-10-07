import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

import UserProfile from './Profile';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const user = session?.user;

  return <UserProfile user={user} />;
};

export default page;
