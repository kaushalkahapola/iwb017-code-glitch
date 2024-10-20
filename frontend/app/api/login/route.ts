import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_swapping_app'
});

interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    location: string;
    bio: string;
    rating: number;
    created_at: Date; // Corrected type declaration
  }

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const [rows]: [mysql.RowDataPacket[], any] = await db.query( // Adjusted type assertion
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  const user = rows[0];

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, SECRET, {
    expiresIn: '1h',
  });

  return NextResponse.json({ token });
}
