import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Clear the authentication cookie
    cookies().delete('token')

    // You can add any additional logout logic here
    // For example, invalidating the token on the server-side if you're using a token blacklist

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ message: 'An error occurred during logout' }, { status: 500 })
  }
}
