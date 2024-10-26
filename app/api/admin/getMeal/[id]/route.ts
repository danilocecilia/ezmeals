import clientPromise from '@lib/mongodb';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ message: 'Invalid meal ID' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const resultData = await db
      .collection('meals')
      .findOne({ _id: new ObjectId(id) });

    if (!resultData) {
      return NextResponse.json({ message: 'Meal not found' }, { status: 404 });
    }
    revalidatePath('/admin/meals');
    return NextResponse.json(resultData, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
