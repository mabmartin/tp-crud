import { Router } from "express"

import { createUser, getUsers, validate } from "../controllers/userController.js";
const userRoute = Router();


userRoute.get("/get", getUsers)
userRoute.post("/create", createUser)
userRoute.post("/login", validate)

export default userRoute;