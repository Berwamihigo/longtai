// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Search for admin by email
        const adminsRef = collection(db, 'admin');
        const q = query(adminsRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 403 }
            );
        }

        const adminDoc = querySnapshot.docs[0];
        const adminData = adminDoc.data();

        

        //verify password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, adminData.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Wrong password' },
                { status: 405 }
            );
        }

        // Create JWT token
        const token = sign(
            { 
                id: adminDoc.id,
                email: adminData.email,
                role: 'admin'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1d' }
        );

        // Set admin session cookie
        const response = NextResponse.json({
            success: true,
            token,
            user: {
                id: adminDoc.id,
                email: adminData.email,
                name: adminData.name
            }
        });

        response.cookies.set("adminSession", JSON.stringify({
            id: adminDoc.id,
            email: adminData.email,
            name: adminData.name,
            role: 'admin'
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/dashboard',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to login' },
            { status: 500 }
        );
    }
}