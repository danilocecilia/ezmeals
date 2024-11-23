import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }
  const { plannerId, quantityToRemove } = await req.json();

  if (!plannerId || !quantityToRemove) {
    return NextResponse.json({ success: false, error: 'Invalid input' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('planner');
    const result = await collection.updateOne(
      { _id: new ObjectId(plannerId) },
      { $inc: { quantity: -quantityToRemove } }
    );
    if (result.modifiedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Item not found or update failed'
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Inventory updated successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    });
  }
}
