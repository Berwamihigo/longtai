import { db } from "@/lib/db";
import { collection, addDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    await addDoc(collection(db, "messages"), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ success: true, message: "Message saved successfully." });
  } catch (error) {
    console.error("Message save error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to save message." },
      { status: 500 }
    );
  }
} 