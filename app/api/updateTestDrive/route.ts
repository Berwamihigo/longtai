import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc } from 'firebase/firestore';

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Test drive ID is required' },
        { status: 400 }
      );
    }

    const testDriveRef = doc(db, 'test-drives', id);
    await updateDoc(testDriveRef, {
      ...updateData,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Test drive updated successfully'
    });
  } catch (error) {
    console.error('Error updating test drive:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update test drive' },
      { status: 500 }
    );
  }
} 