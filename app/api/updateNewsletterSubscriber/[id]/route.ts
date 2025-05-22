import { NextResponse } from 'next/server';
import { db } from '@/app/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const data = await request.json();

    const subscriberRef = doc(db, 'newsletter', id);
    await updateDoc(subscriberRef, {
      status: data.status,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Subscriber status updated successfully'
    });
  } catch (error) {
    console.error('Error updating subscriber:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update subscriber status' },
      { status: 500 }
    );
  }
} 