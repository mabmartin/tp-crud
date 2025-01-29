import { model, Schema } from "mongoose"

const statusEnum = ["AVAILABLE", "UNAVAILABLE", "OUT OF STOCK"] 

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    status: {
        type: String,
        validate: {
            validator: function (status) {
                return statusEnum.includes(status)
            },
            message: (props) => `${props.value} is not a valid status`
        },
        required: true,
        enum: statusEnum,
        
    },
    
     createdAt:{
        type: Date,
        default: Date.now()
     },

     price: {
        type: Number,
        required: [true, "Price field is required"],
        min: [0, "Price field has to be a  number"],
     },
     Image: {
        type: String,
        default: "https://picsum.photos/400"
     }
})



export default model("Product", productSchema)