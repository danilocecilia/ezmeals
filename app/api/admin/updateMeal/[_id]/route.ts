import clientPromise from '@lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const {
      _id,
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

    // Ensure mealId is passed as a string
    if (!ObjectId.isValid(_id)) {
      return NextResponse.json({ message: 'Invalid meal ID' }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const mealsCollection = db.collection('meals');

    // Update the meal with the given mealId
    const updatedMeal = await mealsCollection.findOneAndUpdate(
      { _id: new ObjectId(_id) }, // Find the meal by its ID
      {
        $set: {
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
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );

    if (!updatedMeal || !updatedMeal._id) {
      return NextResponse.json({ message: 'Meal not found' }, { status: 404 });
    }
    revalidatePath('/meals');
    return NextResponse.json({
      message: 'Meal updated successfully',
      meal: updatedMeal.value
    });
  } catch (error) {
    console.error('Error updating meal:', error);
    return NextResponse.json(
      { message: 'Error updating meal' },
      { status: 500 }
    );
  }
}
