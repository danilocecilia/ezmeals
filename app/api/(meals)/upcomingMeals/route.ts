import clientPromise from '@lib/mongodb';
import { format, nextSaturday, nextSunday, addDays } from 'date-fns';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const today = new Date();
    // Determine the start and end dates for the upcoming weekend
    let saturday, sunday;

    // If today is Saturday, set the start date to today and end date to tomorrow (Sunday).
    if (today.getDay() === 6) {
      saturday = today;
      sunday = addDays(today, 1);
    }
    // If today is Sunday, set the start date to next Saturday (6 days from now) and end date to next Sunday.
    else if (today.getDay() === 0) {
      saturday = addDays(today, 6);
      sunday = addDays(today, 7);
    } else {
      // If today is a weekday, calculate the next Saturday and Sunday.
      saturday = addDays(today, 6 - today.getDay());
      sunday = addDays(today, 7 - today.getDay());
    }
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

    // loop through the mealIds and fetch the meals from the meals collection
    const meals = await db
      .collection('meals')
      .find({ _id: { $in: mealObjectIds } })
      .toArray();

    // Map the maxQuantity from the planner collection to the meals collection
    const mealsWithQuantity = meals.map((meal) => {
      const plannerItem = planner.find(
        (item) => item.value === meal._id.toString()
      );
      return {
        ...meal,
        maxQuantity: plannerItem ? plannerItem.quantity : 0,
        plannerId: plannerItem ? plannerItem._id : null
      };
    });

    return NextResponse.json(mealsWithQuantity, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching meals' },
      { status: 400 }
    );
  }
}
