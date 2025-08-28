// school-admin controller

import School from "@modules/schools/school.model";
import { createUser, deleteUser } from "@modules/users/user.service";
import { sendError } from "@utils/sendError";
import { sendSuccess } from "@utils/sendSuccess";
import { validateRequestBody } from "@utils/validation/validateRequest";
import { Request, Response } from "express";
import SchoolAdmin from "./school-admin.model";

export const createSchoolAdmin = async (req:Request, res: Response) => {
    let user;
    try {
      
        // Create the school admin's user profile
        const userDetails = await createUser(req, {role: "admin"})
        user = userDetails

        const safeData = validateRequestBody("creation",'school-admin',req)

        const schoolAdminData = {...safeData, userDetails: userDetails._id, forSchool: userDetails.forSchool}

        const createdSchoolAdmin = await SchoolAdmin.create(schoolAdminData)

        const createdSchoolAdminData = await SchoolAdmin.findById(createdSchoolAdmin._id).populate("userDetails")

        sendSuccess(201,"School Admin created successfuly",createdSchoolAdminData,res,true)

    }catch(err) {
        deleteUser(user?._id as string)
        sendError(500,"School Admin creation failed",err,res)
    }
}