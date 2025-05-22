import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, updateDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { id, ...updateData } = data;

        const carRef = doc(db, 'cardata', id);
        await updateDoc(carRef, {
            ...updateData,
            updatedAt: new Date()
        });

        return NextResponse.json({
            success: true,
            message: 'Car updated successfully'
        });
    } catch (error) {
        console.error('Error updating car:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to update car' },
            { status: 500 }
        );
    }
} 