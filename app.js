import express from "express"
import { sendMail } from "./controllers/sendMail.js";
import cors from "cors"
import LinksRouter from "./routes/UploadLinks.routes.js"
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true,limit:"16kb"}))//url mai special characters ko ecoded hote hai toh unhe sambhalta hai
app.use(cors({
    origin:process.env.FRONTEND_URL
}))


app.use("/api/v1/",LinksRouter) //yaha app.get nhi aayega
app.post("/sendemail",sendMail)  

export {app}