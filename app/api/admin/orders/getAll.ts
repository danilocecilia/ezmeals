import clientPromise from '@lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

type Order = {
  _id: string;
  orderId: string;
  userId: string;
  customerName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: string;
  deliveryAddress: string;
  createdAt: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all orders
    const orders: Order[] = await db.collection('o♂rders').find({}).toArray();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
}
