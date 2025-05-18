import { db } from "@/lib/db";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const clientsCollection = collection(db, "clients");
        const clientsSnapshot = await getDocs(clientsCollection);
        
        const clients = clientsSnapshot.docs.map(doc => {
            const data = doc.data();
            // Exclude sensitive information like password
            return {
                email: data.email,
                name: data.name,
                createdAt: data.createdAt
            };
        });

        return NextResponse.json({
            success: true,
            clients
        });
    } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch clients" },
            { status: 500 }
        );
    }
} 