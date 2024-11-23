import { auth } from '@root/auth';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params: { location } }: { params: { location: string } }
) {
  if (!location || typeof location !== 'string') {
    return NextResponse.json(
      { message: 'Invalid location info' },
      { status: 400 }
    );
  }

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const apiKey = process.env.GEOCODER_API_KEY;
  const response = await fetch(
    `${process.env.GEOCODER_URL}/?autocomplete=1&utm=1&locate=${location}&geoit=xml&auth=${apiKey}&json=1`
  );

  const data = await response.json();

  return NextResponse.json({ data }, { status: 200 });
}
