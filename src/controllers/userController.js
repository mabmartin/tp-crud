import User from "../models/userModel.js";

export const getUsers = async (req, res) => { 
    try {
        const users = await Product.find()
        console.log(users)
        console.log(users.length)    
        if (users.length ===0){
           return res.status(204).json({ message: "No users found" })
    }
    return res.status(200).json(users)
    }  catch (error) {
          return res.status(500).json({ message: "internal server error",error })
    }
}

export const createUser = async (req, res) => { 
    try {
        const userData = new User (req.body)
        const { email} = userData
        await User.findOne({email})
          return res.status(200).json(users)
    }  catch (error) {
          return res.status(500).json({ message: "internal server error",error })
    }
}