import { NextRequest, NextResponse } from 'next/server';

// Simple storage (in real apps, you'd use a database)
let visitors: string[] = [];

// GET /api/greet - Show who has visited
export async function GET(request: NextRequest) {
  // Get query parameters from URL
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');
  const format = searchParams.get('format');
  
  // Basic response
  const response = {
    message: 'Welcome to the greeting API!',
    totalVisitors: visitors.length,
    recentVisitors: visitors.slice(-5), // Show last 5 visitors
    timestamp: new Date().toISOString()
  };
  
  // Personalized greeting if name provided
  if (name) {
    response.message = `Hello, ${name}! Welcome back to the API!`;
  }
  
  // Different format if requested
  if (format === 'simple') {
    return NextResponse.json({
      greeting: response.message,
      count: response.totalVisitors
    });
  }
  
  return NextResponse.json(response);
}

// POST /api/greet - Add a new visitor
export async function POST(request: NextRequest) {
  try {
    const { name, age } = await request.json();
    
    // Input validation
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Please provide a name!' },
        { status: 400 }
      );
    }
    
    if (age && (age < 0 || age > 150)) {
      return NextResponse.json(
        { error: 'Please provide a valid age (0-150)!' },
        { status: 400 }
      );
    }
    
    // Add to our visitor list
    visitors.push(name.trim());
    
    // Keep only last 50 visitors to avoid memory issues
    if (visitors.length > 50) {
      visitors = visitors.slice(-50);
    }
    
    return NextResponse.json({
      message: `Hello, ${name}! Welcome to our API! 🎉`,
      isFirstVisit: visitors.filter(v => v === name).length === 1,
      totalVisitors: visitors.length,
      ageMessage: age ? `Nice to meet you, ${age}-year-old ${name}!` : null,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Please send valid JSON with a name field' },
      { status: 400 }
    );
  }
}