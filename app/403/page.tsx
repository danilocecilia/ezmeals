'use client';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const Error403: React.FC = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-4">Forbidden</h2>
      <p className="text-lg mb-4">Oppppsss... </p>
      <p className="text-lg mb-8">
        {`You don't have permission to access this page.`}
      </p>
      <Button
        onClick={handleGoBack}
        className="px-4 py-2 bg-violet-500 text-white rounded hover:bg-violet-600"
      >
        Go Back
      </Button>
    </div>
  );
};

export default Error403;
