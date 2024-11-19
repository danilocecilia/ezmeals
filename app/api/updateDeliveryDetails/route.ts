import clientPromise from '@lib/mongodb';
import { auth } from '@root/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { dropoffOption, additionalNotes, apartmentNumber } =
    await request.json();

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const doesUserExist = await db
      .collection('users')
      .findOne({ email: session?.user?.email });

    if (!doesUserExist) {
      return NextResponse.json(
        { error: 'failure', faultmessage: '' },
        { status: 400 }
      );
    }

    await db.collection('users').updateOne(
      { email: session?.user?.email },
      {
        $set: {
          apt_suite: apartmentNumber,
          deliveryNotes: additionalNotes,
          dropoffLocation: dropoffOption
        }
      }
    );

    return NextResponse.json({ success: 'success' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}