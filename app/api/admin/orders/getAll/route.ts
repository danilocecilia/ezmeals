import clientPromise from '@lib/mongodb';
import { subMonths } from 'date-fns';
import { NextResponse } from 'next/server';

type Order = {
  _id: string;
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  deliveryAddress: string;
  deliveryMethod: string;
  createdAt: string;
  quantity: number;
};

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Parse query parameters
    const url = new URL(req.url);
    const months = parseInt(url.searchParams.get('months') || '1', 10);

    // Calculate the start date based on the number of months
    const startDate = subMonths(new Date(), months);

    // Fetch orders within the specified period
    const orders = await db
      .collection('orders')
      .find({ createdAt: { $gte: startDate } })
      .toArray();

    // Transform documents to Order type
    // @ts-expect-error - createdAt is a string
    const transformedOrders: Order[] = orders.map((order) => ({
      _id: order._id.toString(),
      orderId: order.orderId,
      userId: order.userId,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      items: order.items,
      total: order.items
        // @ts-expect-error - price is a number
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
      // @ts-expect-error - deliveryAddress is a string
      quantity: order.items.reduce((acc, item) => acc + item.quantity, 0),
      createdAt: order.createdAt
    }));
    console.log(
      '🚀 ~ consttransformedOrders:Order[]=orders.map ~ transformedOrders:',
      transformedOrders
    );
    return NextResponse.json({ orders: transformedOrders }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 400 }
    );
  }
}
