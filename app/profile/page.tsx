import { auth } from '@root/auth';
import React from 'react';

import ProfileForm from './Form';

const UserProfile = async () => {
  const session = await auth();

  const user = session?.user;
  return (
    <div className="px-4">
      <ProfileForm user={user} />
    </div>
  );
};

export default UserProfile;
