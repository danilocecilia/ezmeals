import clientPromise from '@lib/mongodb';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

type MealPlanner = {
  value: string;
  label: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
  createdAt: string;
};

export async function GET() {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

  try {
    const client = await clientPromise;
    const db = client.db();

    const meals = await db.collection('planner').find({}).toArray();

    const listPlanner: MealPlanner[] = meals.map((meal) => ({
      value: meal._id.toString(),
      label: meal.label,
      quantity: meal.quantity,
      deliveryDate: meal.deliveryDate,
      dateFrom: meal.dateFrom,
      dateTo: meal.dateTo,
      createdAt: formatDate(meal.createdAt)
    }));

    return NextResponse.json(listPlanner, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching meal planner' },
      { status: 400 }
    );
  }
}
