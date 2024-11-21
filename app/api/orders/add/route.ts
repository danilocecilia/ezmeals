import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 400 });
    }

    const { paymentIntentId, totalAmount, items } = await req.json();

    if (!paymentIntentId || !totalAmount || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const orderData = {
      customerEmail: session?.user?.email,
      paymentIntentId,
      totalAmount,
      items,
      status: 'succeeded',
      createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(orderData);

    if (!result.acknowledged || !result.insertedId) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, orderResult: result });
  } catch (error) {
    console.error('Error updating inventory:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
