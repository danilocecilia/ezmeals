import { Spinner } from '@components/ui/spinner';
import React from 'react';

const LoadingComponent: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default LoadingComponent;
