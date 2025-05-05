import { db } from "@/lib/db";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const { name, email, password } = data;

        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if a client with this email already exists
        const clientRef = doc(db, "clients", email);
        const clientSnap = await getDoc(clientRef);

        if (clientSnap.exists()) {
            return NextResponse.json(
                { success: false, message: "A user with this email already exists." },
                { status: 409 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save to Firestore
        await setDoc(clientRef, {
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            message: "Client registered successfully",
        });
    } catch (error) {
        console.error("Save client error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to save client" },
            { status: 500 }
        );
    }
}
