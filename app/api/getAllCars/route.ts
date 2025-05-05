import { db } from "@/lib/db";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const carsCollection = collection(db, "cardata");
    const snapshot = await getDocs(carsCollection);

    const cars = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        name: data.carName || doc.id,
        year: data.year || "Unknown",
        price: data.price || 0,
        range: data.range || "N/A",
        mainImageUrl: data.mainImageUrl || "",
        subImages: data.subImages || [],
        powerType: data.powerType || "",
        fullCharge: data.fullCharge || "",
        fullTank: data.fullTank || "",
        mpgRange: data.mpgRange || { min: "", max: "" },
        seats: data.seats || "",
        zeroToSixty: data.zeroToSixty || "",
        category: data.category || "",
        description: data.description || "",
        // add any other fields you want to display
      };
    });

    return NextResponse.json({ success: true, cars }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch car data" },
      { status: 500 }
    );
  }
}
