// school-admin controller

import School from "@modules/schools/school.model";
import { createUser, deleteUser } from "@modules/users/user.service";
import { sendError } from "@utils/sendError";
import { sendSuccess } from "@utils/sendSuccess";
import { validateRequestBody } from "@utils/validation/validateRequest";
import { Request, Response } from "express";

export const createSchoolAdmin = async (req:Request, res: Response) => {
    let user;
    try {
      
        // Create the student's user profile
        const userDetails = await createUser(req, {role: "admin", forSchool: req.body.school})
        user = userDetails


        const safeData = validateRequestBody("creation",'school-admin',req)

        const schoolAdminData = {...safeData, userDetails: userDetails._id, forSchool: userDetails.forSchool}

        const schoolAdmin = (await School.create(schoolAdminData)).populate('userDetails')

        sendSuccess(201,"School Admin created successfuly",schoolAdmin,res,true)

    }catch(err) {
        deleteUser(user?._id as string)
        sendError(500,"School Admin creation failed",err,res)
    }
}