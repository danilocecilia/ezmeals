import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { NextResponse } from 'next/server';
import { OrderProps } from 'types';

export async function GET(
  request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ message: 'Invalid user id' }, { status: 400 });
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db();

  // fetch order by userId
  const orders = (await db
    .collection('orders')
    .find({ userId })
    .toArray()) as unknown as OrderProps[];

  const ordersList = orders?.map((order: OrderProps) => ({
    id: order.orderId,
    date: new Date(order.createdAt).toISOString(),
    status: order.status,
    total: parseFloat(order.totalAmount),
    items: order.items.map((item) => ({
      name: item.name,
      price: item.price,
      image: item.image || '/placeholder.svg',
      quantity: item.quantity
    })),
    fulfillment: {
      type: session.user.deliveryPreference,
      address: order.deliveryAddress || session.user.address,
      name: order.customerName || session.user.name
    }
  }));

  if (!ordersList)
    return NextResponse.json({ error: 'Orders not found' }, { status: 404 });

  // return order data
  return NextResponse.json({ ordersList }, { status: 200 });
}
