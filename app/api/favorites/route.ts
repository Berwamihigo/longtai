import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

// Add a car to favorites
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { email, carName } = data;

        if (!email || !carName) {
            return NextResponse.json(
                { success: false, message: 'Email and car name are required' },
                { status: 400 }
            );
        }

        const userFavoritesRef = doc(db, 'favorites', email);
        const userFavoritesDoc = await getDoc(userFavoritesRef);

        if (!userFavoritesDoc.exists()) {
            // Create new document with initial car
            await setDoc(userFavoritesRef, {
                email,
                carNames: [carName],
                updatedAt: new Date()
            });
        } else {
            // Add car to existing array if not already present
            const userData = userFavoritesDoc.data();
            if (!userData.carNames.includes(carName)) {
                await updateDoc(userFavoritesRef, {
                    carNames: arrayUnion(carName),
                    updatedAt: new Date()
                });
            } else {
                return NextResponse.json(
                    { success: false, message: 'Car is already in favorites' },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Car added to favorites'
        });
    } catch (error) {
        console.error('Error adding to favorites:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to add to favorites' },
            { status: 500 }
        );
    }
}

// Get user's favorites
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email is required' },
                { status: 400 }
            );
        }

        const userFavoritesRef = doc(db, 'favorites', email);
        const userFavoritesDoc = await getDoc(userFavoritesRef);

        if (!userFavoritesDoc.exists()) {
            return NextResponse.json({
                success: true,
                favorites: []
            });
        }

        const userData = userFavoritesDoc.data();
        return NextResponse.json({
            success: true,
            favorites: userData.carNames.map((carName: string) => ({
                carName,
                createdAt: userData.updatedAt?.toDate?.() || new Date().toISOString()
            }))
        });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch favorites' },
            { status: 500 }
        );
    }
}

// Remove a car from favorites
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        const carName = searchParams.get('carName');

        if (!email || !carName) {
            return NextResponse.json(
                { success: false, message: 'Email and car name are required' },
                { status: 400 }
            );
        }

        const userFavoritesRef = doc(db, 'favorites', email);
        const userFavoritesDoc = await getDoc(userFavoritesRef);

        if (!userFavoritesDoc.exists()) {
            return NextResponse.json(
                { success: false, message: 'No favorites found for this user' },
                { status: 404 }
            );
        }

        await updateDoc(userFavoritesRef, {
            carNames: arrayRemove(carName),
            updatedAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'Car removed from favorites'
        });
    } catch (error) {
        console.error('Error removing from favorites:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to remove from favorites' },
            { status: 500 }
        );
    }
} 