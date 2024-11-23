import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  // should check inventory against the items in the cart from planner collection
  const { items } = await req.json();

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ success: false, error: 'Invalid input' });
  }

  const client = await clientPromise;
  const session = (await clientPromise).startSession();
  session.startTransaction();

  try {
    // Loop through each item and revert the inventory changes
    for (const item of items) {
      const { plannerId, quantity } = item;

      // Check if the item exists
      const inventoryItem = await client
        .db()
        .collection('planner')
        .findOne({ _id: new ObjectId(plannerId) }, { session });

      if (!inventoryItem) {
        return NextResponse.json({
          success: false,
          error: `Planner ${new ObjectId(plannerId)} not found`
        });
      }

      // Rollback inventory by incrementing the quantity
      await client
        .db()
        .collection('planner')
        .updateOne(
          { _id: new ObjectId(plannerId) },
          { $inc: { quantity: quantity } },
          { session }
        );

      // Commit the transaction if all inventory updates are successful
      await session.commitTransaction();
      session.endSession();

      // Return success response
      return NextResponse.json({
        success: true,
        message: 'Inventory rolled back successfully.'
      });
    }
  } catch (error) {
    console.error('Error during inventory rollback:', error);
    // Rollback the transaction if any error occurs
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({
      success: false,
      error: 'Inventory rollback failed.'
    });
  }
}
