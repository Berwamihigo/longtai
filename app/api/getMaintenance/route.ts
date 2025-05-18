import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const maintenanceRef = collection(db, 'maintenance');
    const maintenanceSnapshot = await getDocs(maintenanceRef);
    
    const maintenanceRequests = maintenanceSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      success: true,
      maintenanceRequests
    });
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch maintenance requests' },
      { status: 500 }
    );
  }
} 