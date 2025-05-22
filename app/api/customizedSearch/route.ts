import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Car {
  id: string;
  price: number;
  category?: string;
  powerType?: string;
  carName?: string;
  make?: string;
  model?: string;
  year?: number;
  createdAt: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('query');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const powerType = searchParams.get('powerType');

    console.log('Search params:', { searchQuery, category, minPrice, maxPrice, powerType });

    let q = query(collection(db, 'cardata'));
    const querySnapshot = await getDocs(q);
    let cars = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString()
    })) as Car[];

    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      cars = cars.filter(car => {
        const carName = (car.carName || '').toLowerCase();
        const make = (car.make || '').toLowerCase();
        const model = (car.model || '').toLowerCase();
        return carName.includes(query) || make.includes(query) || model.includes(query);
      });
    }

    // Filter by category if provided
    if (category) {
      cars = cars.filter(car => car.category?.toLowerCase() === category.toLowerCase());
    }

    // Filter by power type if provided
    if (powerType) {
      cars = cars.filter(car => car.powerType?.toLowerCase() === powerType.toLowerCase());
    }

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

    console.log('Search results:', cars.length);

    return NextResponse.json({
      success: true,
      results: cars
    });
  } catch (error) {
    console.error('Error performing customized search:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to perform search' },
      { status: 500 }
    );
  }
} 