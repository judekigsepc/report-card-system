import { validateRequestBody } from "@utils/validation/validateRequest"
import {Request, Response} from "express"
import School from "./school.model"
import { sendError } from "@utils/sendError"
import { sendSuccess } from "@utils/sendSuccess"
import { uploadToCloudinary } from "@utils/cloudinary"
import { escapeRegex } from "@utils/regex"

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

      const logoData = await uploadToCloudinary(req,"images",schoolToUpdate.logoData.public_id)

      const updatePayload = logoData
      ?{...safeData, logoData}
      :{...safeData}

      const updatedSchool = await School.findByIdAndUpdate(req.params.id,updatePayload,{new: true})

      sendSuccess(200,"School updated successfuly",updatedSchool,res,true)

     }catch(err) {
      sendError(500,"School update failed",err,res)
     }
}

export const getAllSchools = async (req:Request, res:Response) => {
     try {

      const schools = await School.find({})

      sendSuccess(200, "All schools retrieved successfuly",schools,res,false)

     }catch(err) {
      sendError(500,"Schools retrieval failed",err,res)
     }
}

export const filterSchool = async (req: Request, res: Response) => {
  try {
    const { limit = "10", page = "1" } = req.query;

    // List of searchable fields
    const searchableFields = ["name", "email", "address", "phoneNumbers"];

    // Dynamically build filters
    const filters = searchableFields.reduce((acc, field) => {
      const value = req.query[field];
      if (value) {
        acc[field] = { $regex: escapeRegex(value as string), $options: "i" };
      }
      return acc;
    }, {} as Record<string, any>);

    const limitNumber = Number(limit);
    const pageNumber = Number(page);
    const skip = (pageNumber - 1) * limitNumber;

    const schools = await School.find(filters)
      .skip(skip)
      .limit(limitNumber)
      .sort({ name: 1 }); // optional sorting

    const total = await School.countDocuments(filters);

    sendSuccess(200, "Schools retrieved successfully", {
      schools,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
    }, res, false);

  } catch (err) {
    sendError(500, "Schools retrieval failed", err, res);
  }
};
