"use server";

import cloudinary from "@/lib/cloudinary";
import { prisma as Prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function uploadImage(file: File) {
  try {
    const authResult = await auth();
    const activeUser = authResult?.user;

    if (!activeUser) {
      return { success: false, message: "You are not authenticated" };
    }

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

    if (result.error) {
      return {
        success: false,
        message: result.error.message,
      };
    }

    await Prisma.profileImage.create({
      data: {
        userId: activeUser.id,
        publicId: result.public_id,
        url: result.secure_url,
        format: result.format,
        size: result.bytes,
      },
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
