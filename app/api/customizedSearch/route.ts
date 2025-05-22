import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Car {
  id: string;
  price: number;
  category?: string;
  powerType?: string;
  createdAt: string;
  [key: string]: any; // for other car properties
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const powerType = searchParams.get('powerType');

    let q = query(collection(db, 'cardata'));

    if (category) {
      q = query(q, where('category', '==', category));
    }

    if (powerType) {
      q = query(q, where('powerType', '==', powerType));
    }

    const querySnapshot = await getDocs(q);
    let cars = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString()
    })) as Car[];

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      cars = cars.filter(car => {
        const price = Number(car.price || 0);
        if (minPrice && maxPrice) {
          return price >= Number(minPrice) && price <= Number(maxPrice);
        } else if (minPrice) {
          return price >= Number(minPrice);
        } else if (maxPrice) {
          return price <= Number(maxPrice);
        }
        return true;
      });
    }

    return NextResponse.json({
      success: true,
      cars
    });
  } catch (error) {
    console.error('Error performing customized search:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 