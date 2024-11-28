'use client';
import CardCarousel from '@components/CardCarousel';
import MealItem from '@components/MealItem';
import { MealItemModal } from '@components/MealItemModal';
import { useModal } from '@root/context/ModalContext';
import { MealWithPlanner } from '@types';
import React from 'react';

const HomeContent: React.FC = () => {
  const { isModalOpen, selectedMeal, closeModal } = useModal();

  return (
    <main className="container mx-auto p-3 md:p-4">
      <CardCarousel />

      <MealItemModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMeal && (
          <MealItem
            meal={{
              ...selectedMeal,
              maxQuantity: selectedMeal.maxQuantity ?? 0,
              plannerId: (selectedMeal as MealWithPlanner).plannerId ?? ''
            }}
          />
        )}
      </MealItemModal>
    </main>
  );
};

const Home: React.FC = () => <HomeContent />;

export default Home;
