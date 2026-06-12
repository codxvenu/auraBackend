import express from "express"
import routes from "./routes/index.js"
import { erroHandler } from "./middleware/errorHandler.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./config/db.js";
import fileUpload from "express-fileupload";


await connectDB();
const app = express()
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(cors({origin : "http://localhost:3000",credentials : true }))

app.use("/uploads", express.static("uploads"));
app.use("/api",routes)
app.use(erroHandler)

app.listen(3001,()=>{
    console.log("server started")
})