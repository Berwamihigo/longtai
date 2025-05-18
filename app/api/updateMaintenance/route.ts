import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc } from 'firebase/firestore';

export async function PUT(request: Request) {
  try {
    const maintenanceData = await request.json();
    const { id, status } = maintenanceData;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const maintenanceRef = doc(db, 'maintenance', id);
    await updateDoc(maintenanceRef, {
      status,
      updatedAt: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Maintenance request updated successfully'
    });
  } catch (error) {
    console.error('Error updating maintenance request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update maintenance request' },
      { status: 500 }
    );
  }
} 