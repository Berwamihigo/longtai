import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const messagesRef = collection(db, 'messages');
    const docRef = await addDoc(messagesRef, {
      name,
      email,
      message,
      createdAt: new Date(),
      status: 'unread'
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
} 