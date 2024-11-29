'use client';

import React, { createContext, useContext, useState } from 'react';

const IntersectionContext = createContext<{
  isIntersecting: boolean;
  setIsIntersecting: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useIntersection = () => {
  return useContext(IntersectionContext);
};

interface IntersectionProviderProps {
  children: React.ReactNode;
}

export const IntersectionProvider: React.FC<IntersectionProviderProps> = ({
  children
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  return (
    <IntersectionContext.Provider value={{ isIntersecting, setIsIntersecting }}>
      {children}
    </IntersectionContext.Provider>
  );
};
