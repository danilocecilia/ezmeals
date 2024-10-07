'use client';

import { useState } from 'react';

import ProfileForm from './Form';
import NavigationButton from './NavigationButton';
import Orders from './Orders';

import { UserProps } from '@/interfaces/UserInterfaces';

type IconType = 'profile' | 'orders';

const UserProfile = ({ user }: { user: UserProps | undefined }) => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const sections: { type: IconType; title: string }[] = [
    { type: 'profile', title: 'User Profile' },
    { type: 'orders', title: 'Orders' }
  ];

  const handleNavigationClick = (type: IconType) => {
    setSelectedSection(type);
  };

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 divide-x min-h-[800px]">
        <div className="flex flex-col justify-center items-end space-y-8">
          {sections.map((section) => (
            <NavigationButton
              type={section.type}
              key={section.type}
              title={section.title}
              isSelected={selectedSection === section.type}
              onClick={handleNavigationClick}
            />
          ))}
        </div>
        {selectedSection == 'profile' && user && <ProfileForm user={user} />}
        {selectedSection == 'orders' && <Orders />}
      </div>
    </div>
  );
};

export default UserProfile;
