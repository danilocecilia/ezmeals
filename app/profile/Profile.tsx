'use client';

import { UserProps } from '@types';

import ProfileForm from './Form';

const UserProfile = ({ user }: { user: UserProps }) => {
  return (
    <div className="flex flex-col p-4">
      <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
      <div className="grid grid-cols-1 lg:divide-x h-[800px]">
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
