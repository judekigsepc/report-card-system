import { validateRequestBody } from "@utils/validation/validateRequest"
import {Request, Response} from "express"
import School from "./school.model"
import { sendError } from "@utils/sendError"
import { sendSuccess } from "@utils/sendSuccess"

export const addSchool = async (req:Request,res:Response) => {
    try {
      const safeData = validateRequestBody("creation","school",req)

      const existingSchool = await School.findOne({name:safeData.name})

      const createdSchool = await School.create({...safeData})

     sendSuccess(201,"School added successfuly",createdSchool,res)

    }catch(err) {
      sendError(500,"School addition failed",err,res)
    }
}