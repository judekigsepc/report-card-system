//@utils/cloudinary.ts

import {v2 as cloudinary} from "cloudinary"
import streamifier from "streamifier"

import { Request } from "express";



export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export type ValidFolderNames = "images"

//Note to self: The reason i used streamifier is because of req.file.buffer of multer, which stores the uploaded file in memory, and cloudinary needs a readbale stream

export function uploadToCloudinary(
  req: Request,
  folderName: ValidFolderNames,
  publicId?: string // optional: if provided, overwrites
): Promise<CloudinaryUploadResult | null> {
  if (!req.file) return Promise.resolve(null);

  const buffer = req.file.buffer;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        public_id: publicId,   // overwrite if provided
        overwrite: Boolean(publicId),
        invalidate: Boolean(publicId), // purge CDN cache if overwriting
      },
      (error, result) => {
        if (error) return reject(error);

        if (result?.secure_url && result?.public_id) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          resolve(null);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}

export const deleteFromCloudinary = async (filePublicId: string) => {
  try {
     const result = await cloudinary.uploader.destroy(filePublicId)
     console.log(result)
  }catch(err) {
     console.error(err)
  }
}