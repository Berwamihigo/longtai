import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { sendTestDriveStatusEmail } from '@/app/utils/emailService';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Test drive ID is required' },
        { status: 400 }
      );
    }

    // Get the current test drive request to check if status is changing
    const testDriveRef = doc(db, 'test-drives', id);
    const testDriveDoc = await getDoc(testDriveRef);

    if (!testDriveDoc.exists()) {
      return NextResponse.json(
        { success: false, message: 'Test drive request not found' },
        { status: 404 }
      );
    }

    const currentData = testDriveDoc.data();
    const statusChanged = updateData.status && currentData.status !== updateData.status;

    // Update the test drive request
    await updateDoc(testDriveRef, {
      ...updateData,
      updatedAt: new Date()
    });

    // If status has changed, send an email notification
    if (statusChanged && ['approved', 'completed', 'cancelled'].includes(updateData.status)) {
      try {
        await sendTestDriveStatusEmail(
          currentData.email,
          currentData.name,
          currentData.carName,
          updateData.status as 'approved' | 'completed' | 'cancelled',
          currentData.preferredDate
        );
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Continue with the response even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Test drive request updated successfully',
      data: {
        ...currentData,
        ...updateData,
        id: testDriveDoc.id
      }
    });
  } catch (error) {
    console.error('Error updating test drive request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update test drive request' },
      { status: 500 }
    );
  }
} 