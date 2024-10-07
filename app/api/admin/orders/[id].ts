import clientPromise from '@lib/mongodb';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    // Update order status
    const { status } = req.body;

    const client = await clientPromise;
    const db = client.db('yourdbname');

    // Update order
    try {
      if (typeof id === 'string') {
        await db
          .collection('orders')
          .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
      } else {
        res.status(400).json({ message: 'Invalid order ID' });
        return;
      }
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating order' });
    }

    // Delete order
    if (typeof id === 'string') {
      await db.collection('orders').deleteOne({ _id: new ObjectId(id) });
    } else {
      res.status(400).json({ message: 'Invalid order ID' });
      return;
    }
    // Delete order
    try {
      const client = await clientPromise;
      const db = client.db('yourdbname');
      await db.collection('orders').deleteOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting order' });
      res.status(500).json({ message: 'Error deleting order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
