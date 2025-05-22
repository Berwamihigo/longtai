import { NextResponse } from 'next/server';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../lib/db";


export async function GET() {
  try {
    const testDrivesRef = collection(db, 'test-drives');
    const snapshot = await getDocs(testDrivesRef);
    
    const testDrives = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString(),
    }));

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