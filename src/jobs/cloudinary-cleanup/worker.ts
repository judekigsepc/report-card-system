//@jobs/cloudinary-cleanup/queue.ts

// workers/cleanupWorker.ts
import { getRedis } from '@configs/redis';
import { Worker } from 'bullmq';
import { v2 as cloudinary } from 'cloudinary';

const connection = getRedis()

const worker = new Worker(
  'cloudinary-cleanup',
  async job => {
    const { publicId } = job.data;
    if (!publicId) return;

    try {
      await cloudinary.uploader.destroy(publicId);
      console.log(`Deleted old Cloudinary file: ${publicId}`);
    } catch (err) {
      console.error(`Failed to delete Cloudinary file ${publicId}:`, err);
      throw err;
    }
  },
  { connection }
);

worker.on('completed', job => console.log(`Cleanup job ${job.id} completed`));
worker.on('failed', (job, err) => console.error(`Cleanup job ${job?.id} failed:`, err));


