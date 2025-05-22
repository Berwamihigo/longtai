import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const maintenanceRef = collection(db, 'maintenance');
    const snapshot = await getDocs(maintenanceRef);
    
    const maintenanceRequests = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      maintenanceRequests
    });
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
} 