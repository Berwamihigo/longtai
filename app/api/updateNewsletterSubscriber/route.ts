import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc } from 'firebase/firestore';

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    const subscriberRef = doc(db, 'newsletter', id);
    await updateDoc(subscriberRef, {
      ...updateData,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Subscriber updated successfully'
    });
  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update subscriber' },
      { status: 500 }
    );
  }
} 