
import { Router } from "express";
import { addSchool } from "./school.controller";
import { superAdminOnly } from "@modules/super-admin/super-admin.middleware";

const schoolRouter = Router()

schoolRouter.post('/add', superAdminOnly, addSchool)

export default schoolRouter