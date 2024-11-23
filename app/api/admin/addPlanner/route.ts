import clientPromise from '@lib/mongodb';
import { NextResponse } from 'next/server';

interface SelectedMeal {
  mealId: string;
  mealName: string;
  quantity: number;
  deliveryDate: string;
  dateFrom: string;
  dateTo: string;
}

export async function POST(req: Request) {
  try {
    const items = await req.json();

    // Simple validation
    if (items.length === 0) {
      return NextResponse.json(
        { message: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const itemsWithTimestamp = items.map((item: SelectedMeal) => ({
      ...item,
      createdAt: new Date()
    }));

    const result = await db
      .collection('planner')
      .insertMany(itemsWithTimestamp);
    console.log('🚀 ~ POST ~ result:', result);

    return NextResponse.json(
      { message: 'success', Ids: result.insertedIds },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating meal', error },
      { status: 500 }
    );
  }
}
