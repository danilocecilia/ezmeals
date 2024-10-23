'use client';

import React from 'react';

import { DataTableDemo } from './allMealsTable';
import { Meal } from './columns';

const AllMealsTable = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [meals, setMeals] = React.useState<Meal[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const getAllMeals = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/listMeal`
        );

        const data = await response.json();

        return data;
      };
      const data = await getAllMeals();
      setMeals(data.meals);
      setLoading(false);
    }
    fetchData();
  }, []);

  return loading ? <p> Loading ... </p> : <DataTableDemo mealsData={meals} />;
};

export default AllMealsTable;
