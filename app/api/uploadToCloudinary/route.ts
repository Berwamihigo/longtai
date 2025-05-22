import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { image } = data;

        if (!image) {
            return NextResponse.json(
                { success: false, message: 'No image provided' },
                { status: 400 }
            );
        }

        const result = await cloudinary.uploader.upload(image, {
            folder: 'longtai',
        });

        return NextResponse.json({
            success: true,
            url: result.secure_url,
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to upload image' },
            { status: 500 }
        );
    }
}

