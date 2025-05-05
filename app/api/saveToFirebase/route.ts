//save the data to the firebase database as they will be passed as in this way 
import { db } from "@/lib/db";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        if (!data.carName) {
            return NextResponse.json(
                { success: false, message: "Car name is required" },
                { status: 400 }
            );
        }

        // Create a document reference with carName as the ID
        const carRef = doc(db, "cardata", data.carName);

        // Structure the data with images in a hierarchical form
        const carData = {
            ...data,
            createdAt: new Date().toISOString()
        };

        // Save to Firestore
        await setDoc(carRef, carData);

        return NextResponse.json({
            success: true,
            message: "Car data saved successfully",
            documentId: data.carName
        });

    } catch (error) {
        console.error("Save error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save car data" },
            { status: 500 }
        );
    }
}
