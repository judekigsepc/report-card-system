// /src/utils/checkEnv.ts
export type EnvType = "string" | "number" | "boolean";

export type EnvSchema = {
  [key: string]: EnvType;
};

const checkEnvVars = (schema: EnvSchema): void => {
  for (const key in schema) {
    const value = process.env[key];

    if (value === undefined) {
      throw new Error(`${key} environment variable is missing`);
    }

    switch (schema[key]) {
      case "number":
        if (isNaN(Number(value))) {
          throw new Error(`${key} must be a valid number`);
        }
        break;
      case "boolean":
        if (!["true", "false", "1", "0"].includes(value.toLowerCase())) {
          throw new Error(`${key} must be a boolean (true/false/1/0)`);
        }
        break;
      case "string":
        // Valid
        break;
      default:
        throw new Error(`Unknown type for env key ${key}`);
    }
  }
};

export default checkEnvVars;
