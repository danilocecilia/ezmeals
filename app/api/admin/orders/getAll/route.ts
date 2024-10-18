import clientPromise from '@lib/mongodb';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

type Order = {
  _id: string;
  orderId: string;
  userId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  deliveryAddress: string;
  deliveryMethod: string;
  createdAt: string;
  quantity: number;
};

export async function GET() {
  const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all orders
    const orders = await db.collection('orders').find({}).toArray();

    // Transform documents to Order type
    const transformedOrders: Order[] = orders.map((order) => ({
      _id: order._id.toString(),
      orderId: order.orderId,
      userId: order.userId,
      customerName: order.customerName,
      items: order.items,
      total: order.total,
      deliveryAddress: order.deliveryAddress,
      deliveryMethod: order.deliveryMethod,
      quantity: order.quantity,
      createdAt: formatDate(order.createdAt)
    }));

    return NextResponse.json({ orders: transformedOrders }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Error fetching orders' },
      { status: 400 }
    );
  }
}
