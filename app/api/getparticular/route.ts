import { db } from "@/lib/db";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");

        if (!name) {
            return NextResponse.json(
                { success: false, message: "Missing car name in query" },
                { status: 400 }
            );
        }

        // The carName is used as the document ID
        const carRef = doc(db, "cardata", name);
        const carSnap = await getDoc(carRef);

        if (!carSnap.exists()) {
            return NextResponse.json(
                { success: false, message: "Car not found" },
                { status: 404 }
            );
        }

        const data = carSnap.data();
        // Transform the data to match the expected structure
        const carData = {
            name: data.carName || carSnap.id,
            year: data.year || "Unknown",
            price: data.price || 0,
            range: data.range || "N/A",
            mainImageUrl: data.mainImageUrl || "",
            subImageUrls: data.subImageUrls || [],
            powerType: data.powerType || "",
            fullCharge: data.fullCharge || "",
            fullTank: data.fullTank || "",
            mpgRange: data.mpgRange || { min: "", max: "" },
            seats: data.seats || "",
            zeroToSixty: data.zeroToSixty || "",
            category: data.category || "",
            description: data.description || "",
        };

        return NextResponse.json({
            success: true,
            data: carData,
            documentId: carSnap.id,
        });
    } catch (error) {
        console.error("Error fetching car:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
