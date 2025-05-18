import { db } from "@/lib/db";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { carName, ...updateData } = data;

        if (!carName) {
            return NextResponse.json(
                { success: false, message: "Car name is required" },
                { status: 400 }
            );
        }

        const carRef = doc(db, "cardata", carName);
        const carDoc = await getDoc(carRef);

        if (!carDoc.exists()) {
            return NextResponse.json(
                { success: false, message: "Car not found" },
                { status: 404 }
            );
        }

        await updateDoc(carRef, {
            ...updateData,
            updatedAt: new Date().toISOString()
        });

        return NextResponse.json({
            success: true,
            message: "Car updated successfully"
        });

    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to update car data" },
            { status: 500 }
        );
    }
} 