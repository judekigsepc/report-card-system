import mongoose, { Document, Schema } from "mongoose";

interface ISchool extends Document {
    name: string
    logoData: {
        secure_url: string,
        public_id: string
    }
    phoneNumbers: string[]
    email: string
    address: string
}

const SchoolSchema = new Schema<ISchool>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    logoData: {
        secure_url: {type: String, default:""},
        public_id: {type:String, default:""}
    },
    phoneNumbers: {
        type: [String],
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
},{timestamps: true})

const School = mongoose.model("School",SchoolSchema)

export default School