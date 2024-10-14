import clientPromise from '@lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name,
    description,
    category,
    price,
    image,
    portionSize,
    preparationTime,
    allergens,
    notes
  } = req.body;

  // Simple validation
  if (!name || !portionSize || !price || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    const newMeal = {
      name,
      description,
      category,
      price,
      image,
      portionSize,
      preparationTime,
      allergens,
      notes,
      createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(newMeal);
    res.status(201).json({
      message: 'Meal created successfully',
      orderId: result.insertedId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
}
