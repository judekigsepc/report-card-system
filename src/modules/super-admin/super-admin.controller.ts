import { sendError } from "@utils/sendError";
import { sendSuccess } from "@utils/sendSuccess";
import { validateRequestBody } from "@utils/validation/validateRequest";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export const superAdminLogin = async (req:Request, res: Response) => {
       try {
           validateRequestBody("creation", "super-admin-login",req)

           const {userName, password} = req.body

           if (userName !== process.env.SUPER_ADMIN_USERNAME) {
               throw new Error("Invalid credentials")
           }

           const isPasswordValid = await bcrypt.compare(password, process.env.SUPER_ADMIN_PASSWORD as string)
           if(!isPasswordValid) {
            throw new Error("Wrong password provided")
           }

           const jwtToken = jwt.sign({
            name: process.env.SUPER_ADMIN_NICKNAME,
            role:"super_admin",
           },process.env.JWT_SECRET as string,
           {expiresIn: "6h"})

            res.cookie('token', jwtToken, {
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production"
           })

          return sendSuccess(200,"Super admin login successful",{},res)
       }catch (err) {
          return sendError(500,"Login as super admin failed",err,res)
    }
}