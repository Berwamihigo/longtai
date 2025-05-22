import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, addDoc } from 'firebase/firestore';
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { email, password, name } = data;

        if (!email || !password || !name) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Check if a client with this email already exists
        const clientsRef = collection(db, 'clients');
        const docRef = await addDoc(clientsRef, {
            email,
            password,
            name,
            createdAt: new Date()
        });

        return NextResponse.json({
            success: true,
            id: docRef.id,
            message: 'Client registered successfully'
        });
    } catch (error) {
        console.error('Error saving client:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to register client' },
            { status: 500 }
        );
    }
}
