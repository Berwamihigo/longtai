import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { sendStatusUpdateEmail } from '@/app/utils/emailService';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Maintenance ID is required' },
        { status: 400 }
      );
    }

    // Get the current maintenance request to check if status is changing
    const maintenanceRef = doc(db, 'maintenance', id);
    const maintenanceDoc = await getDoc(maintenanceRef);

    if (!maintenanceDoc.exists()) {
      return NextResponse.json(
        { success: false, message: 'Maintenance request not found' },
        { status: 404 }
      );
    }

    const currentData = maintenanceDoc.data();
    const statusChanged = updateData.status && currentData.status !== updateData.status;

    // Update the maintenance request
    await updateDoc(maintenanceRef, {
      ...updateData,
      updatedAt: new Date()
    });

    // If status has changed, send an email notification
    if (statusChanged && ['verified', 'postponed', 'denied'].includes(updateData.status)) {
      try {
        await sendStatusUpdateEmail(
          currentData.email,
          currentData.name,
          currentData.carModel,
          currentData.serviceType,
          updateData.status,
          currentData.preferredDate
        );
      } catch (emailError) {
        console.error('Error sending email notification:', emailError);
        // Continue with the response even if email fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Maintenance request updated successfully'
    });
  } catch (error) {
    console.error('Error updating maintenance request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update maintenance request' },
      { status: 500 }
    );
  }
} 