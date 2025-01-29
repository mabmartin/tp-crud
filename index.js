import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./src/routes/productRoute.js";
import { connectDB } from "./src/db.js";



const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/product", productRoute)

connectDB()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})