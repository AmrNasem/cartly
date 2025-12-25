/**
 * Delete multiple images from Cloudinary by publicId
 * @param publicIds - array of Cloudinary public IDs
 */

import { APIError } from "../api/errors";
import { v2 as cloudinary } from "cloudinary";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 8;

export function validateImages(files: File[]) {
  if (files.length === 0) {
    return new APIError("At least one image is required", 400);
  }

  if (files.length > MAX_IMAGES) {
    return new APIError(`Max ${MAX_IMAGES} images allowed`, 400);
  }

  for (const file of files) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return new APIError("Invalid image type", 400);
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return new APIError("Image size exceeds 5MB", 400);
    }
  }
}

export async function uploadImages(images: File[]) {
  const imageBuffers = await Promise.all(
    images.map(async (image) => {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return {
        buffer,
        mimeType: image.type,
        filename: image.name,
      };
    })
  );

  return Promise.all(
    imageBuffers.map(async (image, index) => {
      return new Promise((res, rej) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "products" },
            (err, result) => {
              if (err) rej(err);
              if (!result) rej(new APIError("Can't store images"));
              const { secure_url, public_id } = result as {
                secure_url: string;
                public_id: string;
              };
              res({
                url: secure_url,
                publicId: public_id,
                order: index + 1,
              });
            }
          )
          .end(image.buffer);
      });
    })
  );
}

export async function deleteImages(publicIds: string[]) {
  if (!publicIds || !publicIds.length) return;

  return Promise.all(
    publicIds.map(
      (publicId) =>
        new Promise<void>((resolve, reject) => {
          cloudinary.uploader.destroy(
            publicId,
            { resource_type: "image" },
            (error) => {
              if (error) return reject(error);
              resolve();
            }
          );
        })
    )
  );
}
