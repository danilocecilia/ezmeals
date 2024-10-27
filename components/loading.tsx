import { Spinner } from '@components/ui/spinner';
import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="flex items-center gap-3">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default LoadingComponent;
