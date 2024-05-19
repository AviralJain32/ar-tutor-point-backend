import express from "express"
import { sendMail } from "./controllers/sendMail.js";
import cors from "cors"
import { configDotenv } from "dotenv";
import { sendMailForConfirmation } from "./controllers/PaperSubmissionMail.js";



const app=express();
let port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.get("/",(req,res)=>{
    res.send("I am server");
})

app.post("/sendemail",sendMail)  
app.post("/paperSubmission",sendMailForConfirmation)


const start=async()=>{
    try {
        app.listen(port,()=>{
            console.log(`server is started in port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();