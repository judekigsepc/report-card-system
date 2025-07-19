import mongoose, { Document, Schema } from "mongoose";

interface ISchool extends Document {
    name: string
    logoUrl: string
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
    logoUrl: {
        type: String,
        unique: true
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
})

const School = mongoose.model("School",SchoolSchema)

export default School