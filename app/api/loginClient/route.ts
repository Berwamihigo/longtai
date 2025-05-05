// REMOVE this line:
// export const runtime = "edge";

import { db } from "@/lib/db";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        // Parse request body
        let data;
        try {
            data = await request.json();
        } catch (err) {
            console.error("Invalid JSON in request body");
            return NextResponse.json(
                { success: false, message: "Invalid JSON" },
                { status: 400 }
            );
        }

        const { email, password } = data || {};
        if (!email || !password) {
            console.error("Missing email or password");
            return NextResponse.json(
                { success: false, message: "Missing email or password" },
                { status: 400 }
            );
        }

        // Fetch client by email
        const clientRef = doc(db, "clients", email);
        const clientSnap = await getDoc(clientRef);

        if (!clientSnap.exists()) {
            console.error("Client not found for email:", email);
            return NextResponse.json(
                { success: false, message: "Client not found" },
                { status: 404 }
            );
        }

        const clientData = clientSnap.data();
        if (!clientData.password) {
            console.error("No password field in client data:", clientData);
            return NextResponse.json(
                { success: false, message: "Corrupted user data" },
                { status: 500 }
            );
        }

        let passwordMatch = false;
        try {
            passwordMatch = await bcrypt.compare(password, clientData.password);
        } catch (err) {
            console.error("Error comparing passwords:", err);
            return NextResponse.json(
                { success: false, message: "Password comparison failed" },
                { status: 500 }
            );
        }

        if (!passwordMatch) {
            console.error("Invalid password for email:", email);
            return NextResponse.json(
                { success: false, message: "Invalid password" },
                { status: 401 }
            );
        }

        const cookieStore = await cookies(); // ✅ use await in Node.js
        cookieStore.set("session", JSON.stringify({
            email: clientData.email,
            name: clientData.name,
        }), {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                name: clientData.name,
                email: clientData.email,
            },
        });
    } catch (error) {
        console.error("Login client error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to login", error: String(error) },
            { status: 500 }
        );
    }
}
