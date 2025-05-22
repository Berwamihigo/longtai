// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { sign } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        const adminsRef = collection(db, 'admins');
        const q = query(adminsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        if (adminData.password !== password) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        const token = sign(
            { 
                id: adminDoc.id,
                email: adminData.email,
                role: 'admin'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: adminDoc.id,
                email: adminData.email,
                name: adminData.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to login' },
            { status: 500 }
        );
    }
}