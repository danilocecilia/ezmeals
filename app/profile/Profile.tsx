'use client';

import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card';
import { ScrollArea } from '@components/ui/scroll-area';
import { UserProps } from '@types';

import ProfileForm from './Form';

const UserProfile = ({ user }: { user: UserProps }) => {
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-auto">
          <ProfileForm user={user} />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
