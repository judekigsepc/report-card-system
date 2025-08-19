
import { schoolAdminSchema } from "@modules/school-admin/school-admin.schema";
import { schoolSchema } from "@modules/schools/school.schema";
import { superAdminSchema } from "@modules/super-admin/super-admin.schema";
import { userLoginSchema, userSchema } from "@modules/users/user.schema";

export const validationSchemaMap = {
  "user" : userSchema,
  "user-login": userLoginSchema,
  "super-admin-login": superAdminSchema,
  "school": schoolSchema,
  "school-admin": schoolAdminSchema
};

export type ValidationTypes = keyof typeof validationSchemaMap;
