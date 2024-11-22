import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const userSession = await auth();

  if (!userSession) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 400 });
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
    for (const item of items) {
      // Check if the item exists and if the quantity is enough
      const inventoryItem = await client
        .db()
        .collection('planner')
        .findOne({ _id: new ObjectId(item.plannerId) }, { session });

      if (!inventoryItem) {
        return NextResponse.json({
          success: false,
          error: 'Planner not found'
        });
      }

      if (!inventoryItem || inventoryItem.inventory < item.quantity) {
        return NextResponse.json({
          success: false,
          error: 'Not enough inventory'
        });
      }

      // Reserve inventory by decrementing the quantity
      await client
        .db()
        .collection('planner')
        .updateOne(
          { _id: new ObjectId(item.plannerId) },
          { $inc: { quantity: -item.quantity } },
          { session }
        );

      // If everything goes well, commit the transaction
      await session.commitTransaction();
      session.endSession();

      return NextResponse.json({
        success: true,
        message: 'Inventory reserved successfully.'
      });
    }
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json({
      success: false,
      error: 'Failed to reserve inventory.'
    });
  }
}
