import clientPromise from '@lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('planner');

  try {
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    // Convert ids to ObjectIds and perform the deletion
    const objectIds = ids.map((id) => new ObjectId(id));
    const result = await collection.deleteMany({ _id: { $in: objectIds } });

    return NextResponse.json({
      message: `${result.deletedCount} item(s) deleted successfully`
    });
  } catch (error) {
    console.error('Error deleting items:', error);
    return NextResponse.json(
      { error: 'Failed to delete items' },
      { status: 500 }
    );
  }
}
