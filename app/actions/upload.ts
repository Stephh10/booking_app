"use server";

import cloudinary from "@/lib/cloudinary";

export async function uploadImage(file: File) {
  try {
    if (!file) {
      return { success: false, message: "No file provided" };
    }

    if (!file.type.startsWith("image/")) {
      return { success: false, message: "File must be an image" };
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return { success: false, message: "File size must be less than 5MB" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString(
      "base64"
    )}`;

    const result = await cloudinary.uploader.upload(base64String, {
      folder: "nextjs-uploads",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
      transformation: [
        { width: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      bytes: result.bytes,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Upload failed",
    };
  }
}
