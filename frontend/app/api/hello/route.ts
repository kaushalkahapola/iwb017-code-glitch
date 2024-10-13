import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function GET(request: NextRequest) {
    const response = await fetch(`${API_URL}/greeting`);
    const data = await response.text();
    console.log(data);
    return NextResponse.json(data);
}