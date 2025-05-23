import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "@/lib/db";


export async function GET() {
  try {
    const testDrivesRef = collection(db, 'test-drives');
    const snapshot = await getDocs(testDrivesRef);
    
    const testDrives = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        status: data.status || 'pending'
      };
    });

    return NextResponse.json({
      success: true,
      testDrives
    });
  } catch (error) {
    console.error('Error fetching test drives:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch test drives' },
      { status: 500 }
    );
  }
} 