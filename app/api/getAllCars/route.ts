import { db } from "@/lib/db";
import { collection, getDocs } from "firebase/firestore";
import { Darumadrop_One } from "next/font/google";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryParam = searchParams.get("category");

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
        mileage: data.mileage || 0,
        powerType: data.powerType || "",
        fullCharge: data.fullCharge || "",
        fullTank: data.fullTank || "",
        mpgRange: data.mpgRange || { min: "", max: "" },
        seats: data.seats || "",
        zeroToSixty: data.zeroToSixty || "",
        category: data.category || "",
        make: data.make || "",
        description: data.description || "",
      };
    });

    // Filter if category is provided
    const filteredCars = categoryParam
      ? cars.filter(car =>
          car.category?.toLowerCase() === categoryParam.toLowerCase()
        )
      : cars;

    return NextResponse.json({ success: true, cars: filteredCars }, { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch car data" },
      { status: 500 }
    );
  }
}
