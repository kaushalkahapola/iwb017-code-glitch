// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import jwt from 'jsonwebtoken';

// const SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export function middleware(request: NextRequest) {
//   // Get the JWT token from cookies
//   const token = request.cookies.get('auth-token')?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     // Verify the JWT token
//     jwt.verify(token, SECRET);

//     // Proceed to the requested route if token is valid
//     return NextResponse.next();
//   } catch (error) {
//     // Redirect to login if token is invalid or expired
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// // Protect specific routes
// export const config = {
//   matcher: ['/tasks/:path+', '/users/:path*', '/communities/:path+'],
// };


