import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response = "Hello from Next.js!";
    return NextResponse.json(response);
}