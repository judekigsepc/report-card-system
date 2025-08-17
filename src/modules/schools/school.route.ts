// src/modules/schools/school.route.ts

import { Router } from "express";
import { addSchool, filterSchool, getAllSchools, updateSchool } from "./school.controller";
import { superAdminOnly } from "@modules/super-admin/super-admin.middleware";
import { imageUploader } from "@middlewares/upload";

const schoolRouter = Router()

schoolRouter.post('/add', superAdminOnly, imageUploader().single("logo") , addSchool)
schoolRouter.put('/update/:id',superAdminOnly, imageUploader().single("logo"), updateSchool) //THIS SHOULDNT BE FOR ONLY SUPER ADMINS, EVEN THE SCHOOL ADMIN OR OWNER SHOULD BE ABLE TO DO THIS
schoolRouter.get('/all', superAdminOnly, getAllSchools)
schoolRouter.get('/search',superAdminOnly, filterSchool)

export default schoolRouter