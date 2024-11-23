import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
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

    const generateOrderId = async (db: unknown) => {
      const today = new Date();
      const datePart = `${today.getFullYear()}${(today.getMonth() + 1)
        .toString()
        .padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;

      const lastOrder = await db
        .collection('orders')
        .findOne({}, { sort: { createdAt: -1 } });

      let orderNumber = 1;
      if (lastOrder?.orderId?.startsWith(`ORD-${datePart}`)) {
        orderNumber = parseInt(lastOrder.orderId.split('-')[2]) + 1 || 1;
      }

      return `ORD-${datePart}-${orderNumber.toString().padStart(4, '0')}`;
    };

    const orderId = await generateOrderId(db);

    const orderData = {
      orderId: orderId,
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

    return NextResponse.json({
      success: true,
      order: {
        orderId,
        customerEmail: session?.user?.email,
        status: 'succeeded'
      }
    });
  } catch (error) {
    console.error('Error updating inventory:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
