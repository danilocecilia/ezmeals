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

  const updatedItems = [];

  try {
    for (const { plannerId, quantity } of items) {
      if (!plannerId || !quantity) {
        throw new Error('Invalid item input');
      }
      const client = await clientPromise;
      const planner = await client
        .db()
        .collection('planner')
        .findOne({ _id: new ObjectId(plannerId) });

      if (!planner) {
        throw new Error('Planner item not found');
      }

      if (planner.quantity < quantity) {
        updatedItems.push(planner);
      }
    }
    if (updatedItems.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Some items are out of stock',
        updatedInventory: updatedItems
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Inventory check passed'
    });
  } catch (error) {
    console.error('Error checking inventory:', error);
    return NextResponse.json({
      success: false,
      error: (error as Error).message
    });
  }
}
