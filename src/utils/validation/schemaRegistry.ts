
import { schoolSchema } from "@modules/schools/school.schema";
import { superAdminSchema } from "@modules/super-admin/super-admin.schema";
import { userLoginSchema, userSchema } from "@modules/users/user.schema";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,
  "super-admin-login": superAdminSchema,
  "school": schoolSchema
};

export type ValidationTypes = keyof typeof validationSchemaMap;
