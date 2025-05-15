import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Invalid email." }, { status: 400 });
    }
    // Check if email already exists
    const q = query(collection(db, "newsletter"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ success: false, error: "Email already exists." }, { status: 409 });
    }
    await addDoc(collection(db, "newsletter"), {
      email,
      createdAt: Timestamp.now(),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 