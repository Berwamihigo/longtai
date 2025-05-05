import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// Add a car to favorites
export async function POST(request: Request) {
    try {
        const { email, carName } = await request.json();

        if (!email || !carName) {
            return NextResponse.json({ success: false, message: 'Email and car name are required' }, { status: 400 });
        }

        const favRef = doc(db, 'favorites', email);
        const favDoc = await getDoc(favRef);

        if (favDoc.exists()) {
            // Document exists, add to the cars array
            await updateDoc(favRef, {
                cars: arrayUnion(carName)
            });
        } else {
            // Document doesn't exist, create new with initial car
            await setDoc(favRef, {
                cars: [carName]
            });
        }

        return NextResponse.json({ success: true, message: 'Car added to favorites' });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json({ success: false, message: 'Failed to add to favorites' }, { status: 500 });
    }
}

// Get user's favorites
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
        }

        const favRef = doc(db, 'favorites', email);
        const favDoc = await getDoc(favRef);

        if (!favDoc.exists()) {
            return NextResponse.json({ success: true, favorites: [] });
        }

        const data = favDoc.data();
        const favorites = data.cars.map((carName: string) => ({ carName }));

        return NextResponse.json({ success: true, favorites });
    } catch (error) {
        console.error('Error getting favorites:', error);
        return NextResponse.json({ success: false, message: 'Failed to get favorites' }, { status: 500 });
    }
}

// Remove a car from favorites
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const carName = searchParams.get('carName');

        if (!email || !carName) {
            return NextResponse.json({ success: false, message: 'Email and car name are required' }, { status: 400 });
        }

        const favRef = doc(db, 'favorites', email);
        const favDoc = await getDoc(favRef);

        if (favDoc.exists()) {
            await updateDoc(favRef, {
                cars: arrayRemove(carName)
            });
        }

        return NextResponse.json({ success: true, message: 'Car removed from favorites' });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return NextResponse.json({ success: false, message: 'Failed to remove from favorites' }, { status: 500 });
    }
} 