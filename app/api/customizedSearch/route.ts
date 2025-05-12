import { db } from "@/lib/db";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";

    if (!query) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const carsCollection = collection(db, "cardata");
    const snapshot = await getDocs(carsCollection);

    const results = snapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          make: data.carName || doc.id,
          model: data.model || "",
          year: data.year || "Unknown",
        };
      })
      .filter(car =>
        car.id.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query)
      );

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to search cars" },
      { status: 500 }
    );
  }
} 