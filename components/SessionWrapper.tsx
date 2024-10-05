'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { useMemo } from 'react';

interface Props {
  children: React.ReactNode;
  session: Session | null;
}

function Providers({ children, session }: Props) {
  // Memoize a unique key based on session changes
  const memoizedSessionKey = useMemo(() => {
    return session?.user?.id || 'default-session-key'; // Ensure you return a valid key
  }, [session]);

  return (
    <SessionProvider key={memoizedSessionKey} session={session}>
      {children}
    </SessionProvider>
  );
}

export default Providers;
