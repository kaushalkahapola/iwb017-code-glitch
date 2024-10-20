import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(req: Request) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, SECRET);

    // Extract user details from the token
    const { id, username, email } = decoded as { id: number; username: string; email: string };

    // Return the user details
    return NextResponse.json({ id, username, email });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}
