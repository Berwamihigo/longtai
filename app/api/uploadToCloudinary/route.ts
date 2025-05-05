import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_CLOUD_NAME,
    api_key: process.env.NEXT_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_CLOUDINARY_SECRET,
});

export async function POST(request: Request) {
    try {
        const { mainImage, subImages } = await request.json();

        if (!mainImage) {
            return NextResponse.json(
                { success: false, message: "Main image is required" },
                { status: 400 }
            );
        }

        // Upload main image
        const mainImageResult = await cloudinary.uploader.upload(mainImage, {
            folder: "cars/main",
        });

        // Upload sub images
        const subImagePromises = subImages.map((image: string) =>
            cloudinary.uploader.upload(image, {
                folder: "cars/sub",
            })
        );

        const subImageResults = await Promise.all(subImagePromises);

        return NextResponse.json({
            success: true,
            mainImageUrl: mainImageResult.secure_url,
            subImageUrls: subImageResults.map((result) => result.secure_url),
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { success: false, message: "Failed to upload images" },
            { status: 500 }
        );
    }
}

