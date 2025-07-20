//@utils/uploadToCloudinary.ts

import {v2 as cloudinary} from "cloudinary"
import streamifier from "streamifier"

import { Request } from "express";

type ValidFolderNames = "images"  // Will add more as need arises

type CloudinaryUploadResult = {
  secure_url : string,
  public_id: string,
}

export function uploadToCloudinary(req: Request, folderName: ValidFolderNames ): Promise<CloudinaryUploadResult | null> {

  if(!req.file) {
       return Promise.resolve(null)
  }

  const buffer = req.file.buffer
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `${folderName}` },
      (error, result) => {
        if (error) reject(error);
 
        if (result?.secure_url && result?.public_id) {
         resolve({
          secure_url: result.secure_url,
         public_id: result.public_id,
         })
        }

        else {
          resolve(null)
        };
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
}