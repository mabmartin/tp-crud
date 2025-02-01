import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from "../config.js";

export const getUsers = async (req, res) => { 
    try {
        const users = await User.find()
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
         const userFound = await User.findOne({email});
         if (userFound) {
             return res.status(400).json({message: ` User with :${email}  already exists`})
         }
           await userData.save();
          
          return res.status(201).json({message: "User created "});
    }  catch (error) {
          return res.status(500).json({ message: "internal server error",error })
    }
};
export const validate = async (req, res) => {
    try {
        
        if (!(req.body.email && req.body.password)){
            return res.status(400).json({ message: "There's a missing field" })
        }
        const userFound = await User.findOne({email: req.body.email});
        if (!userFound) {
            return res.status(400).json({message: "User or password is incorrect"})
        }

    console.log(userFound)
        
    if(bcrypt.compareSync(req.body.password, userFound.password)){
        
        const payload = {
            userId: userFound._id,
            userEmail: userFound.email
        }
        const token = jwt.sign(payload, SECRET, {expiresIn: "1h"})
        const role = userFound.role;
        return res.status(200).json({ message: "Logged in", token, role, user: {id: userFound._id, email: userFound.email} })
    } else {
        return res.status(400).json({message: "User or password is incorrect"})
    }
    } catch (error) {
        return res.status(500).json({message: "Internal server error", error})
    }
}