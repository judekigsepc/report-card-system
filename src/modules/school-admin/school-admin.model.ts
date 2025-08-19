// school-admin model

import mongoose, { Types, Schema } from "mongoose";

interface ISchoolAdmin {
    userDetails: Types.ObjectId
    forSchool: Types.ObjectId,
    position: string
}

const schoolAdminSchema = new Schema<ISchoolAdmin>({
      userDetails : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      },
      forSchool: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "School"
      },
      position: {
        type: String,
        required: true
      }
})

const SchoolAdmin = mongoose.model("SchoolAdmin",schoolAdminSchema)

export default SchoolAdmin