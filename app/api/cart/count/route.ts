import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
    }

    const userId = sessionCookie.value;
    const cartRef = collection(db, 'cart');
    const q = query(cartRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const count = querySnapshot.size;

    return NextResponse.json({
      success: true,
      count
    });
  } catch (error) {
    console.error('Error getting cart count:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to get cart count' },
      { status: 500 }
    );
  }
} 