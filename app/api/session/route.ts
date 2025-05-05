import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies(); // ✅ Await here
    const session = cookieStore.get("session");

    if (!session) {
        return NextResponse.json({ loggedIn: false });
    }

    try {
        const user = JSON.parse(session.value);
        return NextResponse.json({ loggedIn: true, user });
    } catch (error) {
        console.error("Failed to parse session cookie:", error);
        return NextResponse.json({ loggedIn: false });
    }
}
