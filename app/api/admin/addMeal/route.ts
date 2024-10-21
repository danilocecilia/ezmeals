import clientPromise from '@lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      description,
      category,
      price,
      image,
      portionSize,
      preparationTime,
      allergens,
      notes,
      side
    } = body;

    // Simple validation
    if (!name || !portionSize || typeof price !== 'number' || !image) {
      return NextResponse.json(
        { message: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const newMeal = {
      name,
      description,
      category,
      price,
      image,
      portionSize,
      preparationTime,
      allergens,
      notes,
      side,
      createdAt: new Date()
    };

    const result = await db.collection('meals').insertOne(newMeal);

    return NextResponse.json(
      { message: 'success', mealId: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating meal', error },
      { status: 500 }
    );
  }
}
