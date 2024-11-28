import { auth } from '@root/auth';
import { redirect } from 'next/navigation';

import UserProfile from './Profile';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const user = session?.user;

  return (
    <div className="flex justify-center p-2 lg:p-10">
      {
        // @ts-expect-error - user is not defined
        <UserProfile user={user} />
      }
    </div>
  );
};

export default page;
