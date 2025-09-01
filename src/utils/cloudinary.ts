import { Request } from 'express';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';
import { cleanUpQueue } from '@jobs/cloudinary-cleanup/queue';
export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export type ValidFolderNames = "images"

export async function uploadToCloudinary(
  req: Request,
  folderName: ValidFolderNames,
  oldPublicId?: string // optional: if provided, overwrites existing file
): Promise<CloudinaryUploadResult | null> {
  if (!req.file) return {
            secure_url: '',
            public_id: '',
          };

  const buffer = req.file.buffer;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
        public_id: oldPublicId,
        overwrite: Boolean(oldPublicId),
        invalidate: Boolean(oldPublicId),
      },
      async (error, result) => {
        if (error) return reject(error);

        if (result?.secure_url && result?.public_id) {
          // enqueue cleanup for old file if overwriting a different public_id
          if (oldPublicId && oldPublicId !== result.public_id) {
            await cleanUpQueue.add('delete-old-file', { publicId: oldPublicId });
          }

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
