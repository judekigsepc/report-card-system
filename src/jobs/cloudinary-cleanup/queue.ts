//@jobs/cloudinary-cleanup/queue.ts

import { getRedis } from "@configs/redis";
import { Queue } from "bullmq";

const connection = getRedis()

export const cleanUpQueue = new Queue('cloudinary-cleanup',{connection})

