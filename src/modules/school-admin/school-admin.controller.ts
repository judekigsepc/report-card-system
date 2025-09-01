// school-admin controller

import School from "@modules/schools/school.model";
import { createUser, deleteUser, updateUser } from "@modules/users/user.service";
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

export const updateSchoolAdmin = async (req:Request, res:Response) => {
    try {
          const safeData = validateRequestBody("update",'school-admin',req)

          const {id} = req.params

          const schoolAdminToUpdate = await SchoolAdmin.findById(id).populate("userDetails")

          if(!schoolAdminToUpdate) {
            throw new Error("School admin to update not found")
          }

          //Update the school admin's user profile
          const updatedUserDetails = await updateUser(req,schoolAdminToUpdate.userDetails._id)

          const updatedSchoolAdmin = await SchoolAdmin.findByIdAndUpdate(id,safeData,{new: true}).populate("userDetails")

          sendSuccess(200,"School admin update successful",updatedSchoolAdmin,res,true)
          
    }catch (err) {
          sendError(500,"School admin update failed",err,res)
    }
}

