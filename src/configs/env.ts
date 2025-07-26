// src/configs/env.ts
import checkEnvVars, { EnvSchema } from "@utils/checkEnv";

const schema: EnvSchema = {
  PORT: "number",
  DB_URI: "string",
  JWT_SECRET: "string",
  NODE_ENV: "string",
  SUPER_ADMIN_USERNAME: "string",
  SUPER_ADMIN_PASSWORD: "string",
  SUPER_ADMIN_NICKNAME: "string",
  CLOUDINARY_URL: "string",
  REDIS_HOST: "string",
  REDIS_PORT: "number"
};

checkEnvVars(schema);

