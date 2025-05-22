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

    const testDriveRef = doc(db, 'test-drives', id);
    await updateDoc(testDriveRef, {
      status: data.status,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Test drive status updated successfully'
    });
  } catch (error) {
    console.error('Error updating test drive:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update test drive status' },
      { status: 500 }
    );
  }
} 