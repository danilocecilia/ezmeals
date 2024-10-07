import clientPromise from '@lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, meal, quantity, deliveryMethod, deliveryAddress } = req.body;

  // Simple validation
  if (!userId || !meal || !quantity || !deliveryMethod) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const newOrder = {
      userId,
      meal,
      quantity,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? deliveryAddress : null,
      status: 'pending', // Default status for new orders
      createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(newOrder);
    res.status(201).json({
      message: 'Order created successfully',
      orderId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
}
