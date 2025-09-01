// school-admin routes

import { Router } from "express";
import { createSchoolAdmin, updateSchoolAdmin } from "./school-admin.controller";
import { superAdminOnly } from "@modules/super-admin/super-admin.middleware";
import { imageUploader } from "@middlewares/upload";

const schoolAdminRouter = Router()

schoolAdminRouter.post("/",superAdminOnly, imageUploader().single("avatar") ,createSchoolAdmin)
schoolAdminRouter.put("/:id",superAdminOnly,imageUploader().single("avatar"), updateSchoolAdmin)

export default schoolAdminRouter