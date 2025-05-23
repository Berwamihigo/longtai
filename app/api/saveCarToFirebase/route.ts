import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, setDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { carName, ...carData } = data;

        if (!carName) {
            return NextResponse.json(
                { success: false, message: 'Car name is required' },
                { status: 400 }
            );
        }

        // Create a document reference with carName as the ID
        const carRef = doc(db, 'cardata', carName);

        // Save the car data with timestamp
        await setDoc(carRef, {
            ...carData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return NextResponse.json({
            success: true,
            id: carName,
            message: 'Car saved successfully'
        });

    } catch (error: any) {
        console.error('Error saving car to Firebase:', error);
        return NextResponse.json(
            { 
                success: false, 
                message: error.message || 'Failed to save car data',
                details: error.stack
            },
            { status: 500 }
        );
    }
} 