'use client';

import React from 'react';

import { Meal } from './columns';
import { DataTableDemo } from './list';

const AllMeals = () => {
  const [meals, setMeals] = React.useState<Meal[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const getAllMeals = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/listMeal`,
          {
            cache: 'no-cache'
          }
        );

        const data = await response.json();

        return data;
      };
      const data = await getAllMeals();
      setMeals(data.meals);
    }
    fetchData();
  }, []);

  return <DataTableDemo mealsData={meals} />;
};

export default AllMeals;
