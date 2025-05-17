import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("adminSession");

    if (!adminSession) {
        return NextResponse.json({ loggedIn: false });
    }

    try {
        const admin = JSON.parse(adminSession.value);
        return NextResponse.json({ loggedIn: true, admin });
    } catch (error) {
        console.error("Failed to parse admin session cookie:", error);
        return NextResponse.json({ loggedIn: false });
    }
}
