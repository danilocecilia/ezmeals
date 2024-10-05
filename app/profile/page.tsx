'use client';

import { useState, useEffect } from 'react';

import ProfileForm from './Form';
import NavigationButton from './NavigationButton';

const UserProfile = () => {
  const [selectedSection, setSelectedSection] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/getUser');
        const data = await response.json();

        if (data.success) {
          const { user } = data.success;
          setUser(user);
        }
      } catch {
        setError('Failed to load session');
      }
      setLoading(false);
    };

    fetchSession();
  }, []);

  const sections = [
    { type: 'profile', title: 'User Profile' },
    { type: 'orders', title: 'Orders' }
  ];

  const handleNavigationClick = (type: string) => {
    setSelectedSection(type);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 divide-x">
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
        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default UserProfile;
