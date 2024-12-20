'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Meal = {
  _id: string;
  name: string;
  price: number;
  image: { url: string }[];
  description?: string;
  category?: string;
  maxQuantity?: number;
};

interface ModalContextProps {
  isModalOpen: boolean;
  selectedMeal: Meal | null;
  openModal: (meal: Meal) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const openModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
  };

  return (
    <ModalContext.Provider
      value={{ isModalOpen, selectedMeal, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
