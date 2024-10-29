import clientPromise from '@lib/mongodb';
import { format, nextSaturday, nextSunday } from 'date-fns';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    // Calculate the start and end dates for the upcoming weekend
    const saturday = nextSaturday(new Date());
    const sunday = nextSunday(new Date());

    const startDate = format(saturday, 'dd-MM-yyyy');
    console.log('🚀 ~ GET ~ startDate:', startDate);
    const endDate = format(sunday, 'dd-MM-yyyy');
    console.log('🚀 ~ GET ~ endDate:', endDate);

    // Fetch upcoming meals from planner collection
    // Query meals with a date in the upcoming weekend range
    const planner = await db
      .collection('planner')
      .find({
        dateFrom: { $lte: endDate }, // Ensure dateFrom is on or before the end date
        dateTo: { $gte: startDate } // Ensure dateTo is on or after the start date
      })
      .toArray();

    // Get the mealIds from the planner collection
    const mealIds = planner.map((meal) => meal.value);
    const mealObjectIds = mealIds.map((id) => new ObjectId(id));
    console.log('🚀 ~ GET ~ mealIds:', mealIds);

    // loop through the mealIds and fetch the meals from the meals collection
    const meals = await db
      .collection('meals')
      .find({ _id: { $in: mealObjectIds } })
      .toArray();

    return NextResponse.json(meals, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching meals' },
      { status: 400 }
    );
  }
}
