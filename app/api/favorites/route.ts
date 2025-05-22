import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

// Add a car to favorites
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { userId, carId } = data;

        if (!userId || !carId) {
            return NextResponse.json(
                { success: false, message: 'User ID and car ID are required' },
                { status: 400 }
            );
        }

        const favoritesRef = collection(db, 'favorites');
        const q = query(
            favoritesRef,
            where('userId', '==', userId),
            where('carId', '==', carId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return NextResponse.json(
                { success: false, message: 'Car is already in favorites' },
                { status: 400 }
            );
        }

        const docRef = await addDoc(favoritesRef, {
            userId,
            carId,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            id: docRef.id,
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
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 }
            );
        }

        const favoritesRef = collection(db, 'favorites');
        const q = query(favoritesRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const favorites = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date().toISOString()
        }));

        return NextResponse.json({
            success: true,
            favorites
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
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Favorite ID is required' },
                { status: 400 }
            );
        }

        const favoriteRef = doc(db, 'favorites', id);
        await deleteDoc(favoriteRef);

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