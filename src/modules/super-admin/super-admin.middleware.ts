import { sendError } from "@utils/sendError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { SuperAdminPayload } from "./super-admin.types";

export const superAdminOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token

        const payload = jwt.verify(token,process.env.JWT_SECRET as string) as SuperAdminPayload

        if(payload.role !== "super_admin") {
            throw new Error("Not an admin")
        }

        req.user = payload

        next()

    }catch(err) {
        return sendError(500,"Super admin auth failed",err,res)
    }
}