import  jwt  from "jsonwebtoken"
import { SECRET } from "../config.js"



export const verifyTokenMiddleware = (req, res, next) => {
    try {
        const authheader = req.headers.authorization
        console.log({authheader})
        if (!authheader || !authheader.startsWith("Bearer")) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        
        const token = authheader.split(" ")[1]
        console.log({token})
        const decoded = jwt.verify(token, SECRET)
        console.log({decoded})
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}
       