import clientPromise from '@lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { message: 'Invalid Inventory ID' },
      { status: 400 }
    );
  }
  console.log('id', id);
  try {
    const client = await clientPromise;
    const db = client.db();
    const resultData = await db
      .collection('planner')
      .findOne({ _id: new ObjectId(id) });

    if (!resultData) {
      return NextResponse.json(
        { message: 'Inventory not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(resultData, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
