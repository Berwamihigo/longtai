import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, carId, carName, preferredDate, additionalNotes } = data;

    // Validate required fields
    if (!name || !email || !phone || !carId || !carName || !preferredDate) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add the test drive request to Firestore
    const testDrivesRef = collection(db, 'test-drives');
    const docRef = await addDoc(testDrivesRef, {
      name,
      email,
      phone,
      carId,
      carName,
      preferredDate,
      additionalNotes: additionalNotes || '',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: 'Test drive request submitted successfully',
      id: docRef.id
    });
  } catch (error) {
    console.error('Error submitting test drive request:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit test drive request' },
      { status: 500 }
    );
  }
} 