import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/dbConnection.js";

const PORT=process.env.PORT || 8000

dotenv.config({
    path:"./.env"
})


connectDB() //async await returns promises
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERRR : ",error);
        throw error
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!! ",err);
})

app.listen(PORT,()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
});
