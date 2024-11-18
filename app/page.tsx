'use client';
import CardCarousel from '@components/CardCarousel';
import MealItem from '@components/MealItem';
import { MealItemModal } from '@components/MealItemModal';
import { useModal } from '@root/context/ModalContext';
import React from 'react';

const HomeContent: React.FC = () => {
  const { isModalOpen, selectedMeal, closeModal } = useModal();

  return (
    <main className="container mx-auto p-4">
      <CardCarousel />

      <MealItemModal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMeal && (
          <MealItem
            meal={{
              ...selectedMeal,
              maxQuantity: selectedMeal.maxQuantity ?? 0
            }}
          />
        )}
      </MealItemModal>
    </main>
  );
};

const Home: React.FC = () => <HomeContent />;

export default Home;
