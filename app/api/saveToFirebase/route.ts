//save the data to the firebase database as they will be passed as in this way 
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { collectionName, ...documentData } = data;
        
        if (!collectionName) {
            return NextResponse.json(
                { success: false, message: 'Collection name is required' },
                { status: 400 }
            );
        }

        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, {
            ...documentData,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: 'Document saved successfully'
        });

    } catch (error) {
        console.error('Error saving to Firebase:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to save document' },
            { status: 500 }
        );
    }
}
