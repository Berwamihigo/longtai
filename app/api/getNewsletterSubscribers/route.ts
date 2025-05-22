import { NextResponse } from 'next/server';
import { db } from "../../../lib/db";
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  try {
    const subscribersRef = collection(db, 'newsletter');
    const snapshot = await getDocs(subscribersRef);
    
    const subscribers = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subscribedAt: doc.data().subscribedAt?.toDate?.() || new Date().toISOString(),
    }));

    return NextResponse.json({
      success: true,
      subscribers
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch newsletter subscribers' },
      { status: 500 }
    );
  }
} 