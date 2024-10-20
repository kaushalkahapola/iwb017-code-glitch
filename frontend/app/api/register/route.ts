import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'task_swapping_app'
});

export async function POST(req: Request) {
  const { username, email, password, location, bio } = await req.json();
  console.log(username, email, password,location,bio)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)

  try {
    const [result] = await db.query(
      'INSERT INTO users (username, email, location, bio, password_hash) VALUES (?, ?, ? , ? , ?)',
      [username, email,location, bio, hashedPassword]
    );
    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
