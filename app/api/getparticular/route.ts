import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID is required' },
                { status: 400 }
            );
        }

        const docRef = doc(db, 'cardata', id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json(
                { success: false, message: 'Car not found' },
                { status: 404 }
            );
        }

        const data = docSnap.data();
        return NextResponse.json({
            success: true,
            data: {
                id: docSnap.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() || new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Error fetching car:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch car' },
            { status: 500 }
        );
    }
}
