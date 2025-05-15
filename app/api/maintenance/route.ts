import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await addDoc(collection(db, "maintenance"), {
      ...data,
      createdAt: Timestamp.now(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 