'use client';

import React from 'react';

import { Meal } from './columns';
import { DataTableDemo } from './list';

const AllMealsTable = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [meals, setMeals] = React.useState<Meal[]>([]);

  React.useEffect(() => {
    async function fetchData() {
      const getAllMeals = async () => {
        const response = await fetch(`/api/admin/listMeal`);

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
