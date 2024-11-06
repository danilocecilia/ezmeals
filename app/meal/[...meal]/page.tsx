import MealItem from '@components/MealItem';
import { MealItemModal } from '@components/MealItemModal';
import React from 'react';

const MealPage = () => {
  return (
    <>
      <MealItemModal>
        <MealItem />
      </MealItemModal>
    </>
  );
};

export default MealPage;
