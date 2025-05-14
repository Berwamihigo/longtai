// app/api/admin/login/route.ts
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

        // Fetch admin by email
        const adminRef = doc(db, "admins", email);
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
            console.error("Admin not found for email:", email);
            return NextResponse.json(
                { success: false, message: "Admin not found" },
                { status: 404 }
            );
        }

        const adminData = adminSnap.data();
        if (!adminData.password) {
            console.error("No password field in admin data:", adminData);
            return NextResponse.json(
                { success: false, message: "Corrupted admin data" },
                { status: 500 }
            );
        }

        let passwordMatch = false;
        try {
            passwordMatch = await bcrypt.compare(password, adminData.password);
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

        const cookieStore = await cookies();
        cookieStore.set("admin_session", JSON.stringify({
            email: adminData.email,
            name: adminData.name,
            role: adminData.role || 'admin',
            permissions: adminData.permissions || []
        }), {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/admin",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                name: adminData.name,
                email: adminData.email,
                role: adminData.role || 'admin',
                permissions: adminData.permissions || []
            },
        });
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to login", error: String(error) },
            { status: 500 }
        );
    }
}