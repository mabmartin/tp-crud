import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

const rolesEnum = ["ADMIN", "MERCHANT", "CUSTOMER"] 

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String ,
        required: [true, "Name field is required"],
        trim: true,
     },
    
     Image: {
        type: String,
        default: "https://picsum.photos/400"
     },
     email: {
        type: String ,
        
        required: [true, "Email field is required"],
        trim: true,
        unique: true,
     },
     roles: {
        type: String ,
        validate: {
            validator: function (status) {
                return rolesEnum.includes(status)
            },
            message: (props) => `${props.value} is not a valid role`
        },
        required: [true,"role field is required"],
        enum: rolesEnum,
        
    },
      
})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export default model("user", userSchema)