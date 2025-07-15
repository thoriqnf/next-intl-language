import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for the demo (in production, use a real database)
let visitors = [
  {
    id: 1,
    name: "Sarah Johnson",
    message: "Love this guestbook! Great way to connect with everyone.",
    timestamp: new Date('2024-01-15T10:30:00').toISOString(),
    avatar: "🌟"
  },
  {
    id: 2,
    name: "Mike Chen",
    message: "Just wanted to say hello and share my thoughts. Building amazing things together!",
    timestamp: new Date('2024-01-14T14:20:00').toISOString(),
    avatar: "🚀"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    message: "This is so cool! Looking forward to seeing more updates.",
    timestamp: new Date('2024-01-13T09:15:00').toISOString(),
    avatar: "🎨"
  }
];

let nextId = 4;

// GET /api/visitors - Get all visitors
export async function GET(request) {
  try {
    // Sort by timestamp (newest first)
    const sortedVisitors = [...visitors].sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );

    return NextResponse.json({ 
      visitors: sortedVisitors,
      total: sortedVisitors.length 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch visitors' },
      { status: 500 }
    );
  }
}

// POST /api/visitors - Add a new visitor
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    // Input validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 5) {
      return NextResponse.json(
        { error: 'Message must be at least 5 characters long' },
        { status: 400 }
      );
    }

    if (message.length > 300) {
      return NextResponse.json(
        { error: 'Message must not exceed 300 characters' },
        { status: 400 }
      );
    }

    // Generate random avatar emoji
    const avatars = ['🌟', '🚀', '🎨', '💡', '🌈', '🔥', '⚡', '🎯', '💎', '🌸'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    // Create new visitor
    const newVisitor = {
      id: nextId++,
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      avatar: randomAvatar
    };

    visitors.unshift(newVisitor); // Add to beginning of array

    // Keep only last 50 visitors to avoid memory issues
    if (visitors.length > 50) {
      visitors = visitors.slice(0, 50);
    }

    return NextResponse.json(
      {
        message: 'Visitor added successfully!',
        visitor: newVisitor,
        total: visitors.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding visitor:', error);
    return NextResponse.json(
      { error: 'Failed to add visitor. Please try again.' },
      { status: 500 }
    );
  }
}