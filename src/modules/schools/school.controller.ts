import { validateRequestBody } from "@utils/validation/validateRequest"
import {Request, Response} from "express"
import School from "./school.model"
import { sendError } from "@utils/sendError"
import { sendSuccess } from "@utils/sendSuccess"
import { uploadToCloudinary } from "@utils/cloudinaryUpload"

export const addSchool = async (req:Request,res:Response) => {
    try {
      const safeData = validateRequestBody("creation","school",req)

      const existingSchool = await School.findOne({name:safeData.name}).lean()

      if (existingSchool) {
        throw new Error("School already exists")
      }

       const logoData = await uploadToCloudinary(req,"images")


      const createdSchool = await School.create({...safeData,logoData:logoData})

     sendSuccess(201,"School added successfuly",createdSchool,res,true)

    }catch(err) {
      sendError(500,"School addition failed",err,res)
    }
}

export const updateSchool = async (req:Request, res:Response) => {
     try {
      const safeData = validateRequestBody("update","school",req)

      const schoolToUpdate = await School.findOne({_id: req.params.id})

      if(!schoolToUpdate) {
        throw new Error("School to update does not exist")
      }

      const logoData = await uploadToCloudinary(req,"images")

      const updatePayload = logoData
      ?{...safeData, logoData}
      :{...safeData}

      const updatedSchool = await School.findByIdAndUpdate(req.params.id,updatePayload,{new: true})

      sendSuccess(200,"School updated successfuly",updatedSchool,res,true)

     }catch(err) {
      sendError(500,"School update failed",err,res)
     }
}