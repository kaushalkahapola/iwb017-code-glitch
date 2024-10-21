import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req: any) {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if not authenticated
  }

  try {
    jwt.verify(token, SECRET); // Verify the token
    return NextResponse.next(); // Proceed to the requested route
  } catch (error) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect if token is invalid
  }
}

export const config = {
    matcher: ['/tasks/:path+', '/users/:path*', '/communities/:path+'], // Protect this route
};
