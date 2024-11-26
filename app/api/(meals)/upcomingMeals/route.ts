import clientPromise from '@lib/mongodb';
import { addDays, format } from 'date-fns';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const today = new Date();

    let saturday, sunday;

    // Determine the start and end dates for the upcoming weekend
    if (today.getDay() === 0) {
      // If today is Sunday, get the next weekend
      saturday = addDays(today, 6); // Next Saturday
      sunday = addDays(today, 7); // Next Sunday
    } else {
      // For other days, calculate the next Saturday and Sunday
      saturday = addDays(today, 6 - today.getDay()); // Next Saturday
      sunday = addDays(today, 7 - today.getDay()); // Next Sunday
    }
    console.log('🚀 ~ GET ~ saturday:', format(saturday, 'dd-MM-yyyy'));
    console.log('🚀 ~ GET ~ sunday:', format(sunday, 'dd-MM-yyyy'));
    // Use the dates directly without formatting for querying if date fields in the DB are of Date type
    const planner = await db
      .collection('planner')
      .find({
        dateFrom: { $lte: format(saturday, 'dd/MM/yyyy') }, // Scheduled from before or on the upcoming Saturday
        dateTo: { $gte: format(sunday, 'dd/MM/yyyy') } // Scheduled to after or on the upcoming Sunday
      })
      .toArray();

    // Extract meal IDs and validate them
    const mealIds = planner.map((meal) => meal.mealId);
    const mealObjectIds = mealIds
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    // Fetch meals by IDs
    const meals = await db
      .collection('meals')
      .find({ _id: { $in: mealObjectIds } })
      .toArray();

    // Map maxQuantity and plannerId from planner data to meals
    const mealsWithQuantity = meals.map((meal) => {
      const plannerItem = planner.find(
        (item) => item.mealId === meal._id.toString()
      );
      return {
        ...meal,
        maxQuantity: plannerItem ? plannerItem.quantity : 0,
        plannerId: plannerItem ? plannerItem._id : null
      };
    });

    return NextResponse.json(mealsWithQuantity, { status: 200 });
  } catch (error) {
    console.error('Error in GET handler:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching meals';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
