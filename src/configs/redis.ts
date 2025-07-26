import { Redis } from "ioredis";

let redis: Redis;

export const connectRedis = async () => {
  redis = new Redis({
    host: process.env.REDIS_HOST as string,
    port: Number(process.env.REDIS_PORT),
  });

  return new Promise<void>((resolve, reject) => {
    redis.on("connect", () => {
      console.log("✅ Redis connected");
      resolve();
    });

    redis.on("error", (err) => {
      console.error("❌ Redis error:", err);
      reject(err);
    });
  });
};

export const getRedis = (): Redis => {
  if (!redis) {
    throw new Error("Redis client not connected. Call connectRedis() first.");
  }
  return redis;
};
