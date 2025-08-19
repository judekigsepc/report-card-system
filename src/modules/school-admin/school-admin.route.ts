// school-admin routes

import { Router } from "express";
import { createSchoolAdmin } from "./school-admin.controller";
import { superAdminOnly } from "@modules/super-admin/super-admin.middleware";

const schoolAdminRouter = Router()

schoolAdminRouter.post("/",superAdminOnly,createSchoolAdmin)

export default schoolAdminRouter