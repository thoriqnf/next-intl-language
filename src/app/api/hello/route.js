import { NextResponse } from 'next/server';

// GET method - returns data
export async function GET() {
  return NextResponse.json({ 
    message: 'Hello! This is my first API!',
    timestamp: new Date().toISOString(),
    version: 'Next.js 15+'
  });
}

// POST method - receives data
export async function POST(request) {
  try {
    // Get the data someone sent to us
    const data = await request.json();
    
    // Send back a personalized response
    return NextResponse.json({
      message: `Hello, ${data.name || 'Anonymous'}!`,
      yourMessage: data.message || 'No message provided',
      timestamp: new Date().toISOString(),
      receivedData: data
    });
  } catch (error) {
    // If something goes wrong, be helpful
    return NextResponse.json(
      { error: 'Please send valid JSON data' },
      { status: 400 }
    );
  }
}