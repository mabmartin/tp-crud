import mongoose, { model } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        lowercase: true,
        
    }
})
 export default model("category", categorySchema)