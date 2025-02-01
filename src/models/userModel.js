import { model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

const rolesEnum = ["ADMIN", "MERCHANT", "CUSTOMER"] 

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter user name"],
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String ,
        required: [true, "password field is required"],
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
        type: [String],
        required: [true,"role field is required"],
        enum: rolesEnum,
        validate: {
            validator: function(value) {
                
                return value.every(role => rolesEnum.includes(role));
            },
            message: (props) => `${props.value} is not a valid role`
        },
       
        
    },
      
})

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hashSync(this.password, 10)
    next()
})

export default model("user", userSchema)