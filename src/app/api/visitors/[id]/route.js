import { NextRequest, NextResponse } from 'next/server';

// Note: In a real app, you'd use a proper database
// For this demo, we'll access the visitors array directly
// This is a simplified approach for learning purposes

// We need to access the same visitors array from the main route
// In a real app, this would be a database query

// GET /api/visitors/[id] - Get specific visitor
export async function GET(request, { params }) {
  try {
    // This is a demo limitation - in a real app, you'd query the database
    return NextResponse.json(
      { error: 'Individual visitor lookup not implemented in this demo' },
      { status: 501 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch visitor' },
      { status: 500 }
    );
  }
}

// PUT /api/visitors/[id] - Update visitor
export async function PUT(request, { params }) {
  try {
    const visitorId = parseInt(params.id);
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

    // For demo purposes, we'll simulate success
    // In a real app, you'd update the database
    const updatedVisitor = {
      id: visitorId,
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      avatar: '✨' // Updated indicator
    };

    return NextResponse.json({
      message: 'Visitor updated successfully!',
      visitor: updatedVisitor
    });

  } catch (error) {
    console.error('Error updating visitor:', error);
    return NextResponse.json(
      { error: 'Failed to update visitor. Please try again.' },
      { status: 500 }
    );
  }
}

// DELETE /api/visitors/[id] - Delete visitor
export async function DELETE(request, { params }) {
  try {
    const visitorId = parseInt(params.id);
    
    if (isNaN(visitorId)) {
      return NextResponse.json(
        { error: 'Invalid visitor ID' },
        { status: 400 }
      );
    }

    // For demo purposes, we'll simulate success
    // In a real app, you'd delete from the database
    return NextResponse.json({
      message: 'Visitor deleted successfully!',
      id: visitorId
    });

  } catch (error) {
    console.error('Error deleting visitor:', error);
    return NextResponse.json(
      { error: 'Failed to delete visitor. Please try again.' },
      { status: 500 }
    );
  }
}