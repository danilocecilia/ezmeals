'use client';
import MealItem from '@components/MealItem';
import { MealItemModal } from '@components/MealItemModal';
import React, { useState } from 'react';

const MealPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const meal = {
    _id: '1',
    name: 'Sample Meal',
    price: 10,
    image: [{ url: 'https://via.placeholder.com/150' }],
    description: 'This is a sample meal description.',
    category: 'Main Course',
    maxQuantity: 5,
    plannerId: 'planner-1'
  };

  return (
    <>
      <button onClick={handleOpenModal}>Open Meal Modal</button>
      <MealItemModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MealItem meal={meal} />
      </MealItemModal>
    </>
  );
};

export default MealPage;
