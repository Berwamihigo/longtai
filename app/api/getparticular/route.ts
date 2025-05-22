import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const name = searchParams.get('name');

        console.log('getparticular request params:', { id, name }); // Debug log

        if (!id && !name) {
            return NextResponse.json(
                { success: false, message: 'Either ID or name is required' },
                { status: 400 }
            );
        }

        let docSnap;
        if (id) {
            const docRef = doc(db, 'cardata', id);
            docSnap = await getDoc(docRef);
        } else {
            const carsRef = collection(db, 'cardata');
            const q = query(carsRef, where('carName', '==', name));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                docSnap = querySnapshot.docs[0];
            }
        }

        if (!docSnap || !docSnap.exists()) {
            console.log('Car not found for:', { id, name }); // Debug log
            return NextResponse.json(
                { success: false, message: 'Car not found' },
                { status: 404 }
            );
        }

        const data = docSnap.data();
        const response = {
            success: true,
            data: {
                id: docSnap.id,
                name: data.carName || data.name, // Ensure name is included
                ...data,
                createdAt: data.createdAt?.toDate?.() || new Date().toISOString()
            }
        };

        console.log('getparticular response:', response); // Debug log

        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching car:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch car' },
            { status: 500 }
        );
    }
}
