import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    const cookieStore = await cookies();
    cookieStore.set("adminSession", "", { maxAge: 0, path: "/dashboard" });
    return NextResponse.json({ success: true, message: "Logged out" });
} 