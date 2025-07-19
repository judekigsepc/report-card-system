
import { Router } from "express";
import { superAdminLogin } from "./super-admin.controller";

const superAdminRouter = Router()

superAdminRouter.post('/login', superAdminLogin)

export default superAdminRouter