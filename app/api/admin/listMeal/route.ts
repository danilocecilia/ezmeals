import clientPromise from '@lib/mongodb';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

type Meal = {
  _id: string;
  name: string;
  description: string;
  category: string;
  image: Array<{ path: string; preview: string }>;
  price: number;
  portionSize: string;
  preparationTime: string;
  notes: string;
  allergens: Array<{ value: string; label: string }>;
  quantity: number;
  createdAt: string;
};

export async function GET() {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all meals
    const meals = await db.collection('meals').find({}).toArray();
    console.log('🚀 ~ GET ~ meals:', meals);

    // Transform documents to Order type
    const transformedMeals: Meal[] = meals.map((meal) => ({
      _id: meal._id.toString(),
      // mealId: meal.mealId,
      name: meal.name,
      description: meal.description,
      category: meal.category,
      image: meal.image,
      price: meal.price,
      portionSize: meal.portionSize,
      preparationTime: meal.preparationTime,
      notes: meal.notes,
      allergens: meal.allergens,
      quantity: meal.quantity,
      createdAt: formatDate(meal.createdAt)
    }));

    return NextResponse.json({ meals: transformedMeals }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching meals' },
      { status: 400 }
    );
  }
}
