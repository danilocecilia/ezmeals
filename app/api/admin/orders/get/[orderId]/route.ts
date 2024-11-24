import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params: { orderId } }: { params: { orderId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing orderId parameter' },
        { status: 400 }
      );
    }

    // Fetch order by orderId
    const order = await db.collection('orders').findOne({ orderId });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Transform document to Order type
    // const transformedOrder = {
    //   _id: order._id.toString(),
    //   orderId: order.orderId,
    //   userId: order.userId,
    //   customerName: order.customerName,
    //   customerEmail: order.customerEmail,
    //   items: order.items,
    //   total: order.items
    //     .reduce((acc, item) => acc + item.price * item.quantity, 0)
    //     .toFixed(2),
    //   deliveryAddress: order.deliveryAddress,
    //   deliveryMethod: order.deliveryMethod,
    //   createdAt: order.createdAt,
    //   quantity: order.items.reduce((acc, item) => acc + item.quantity, 0)
    // };

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
