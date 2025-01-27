import dotenv from "dotenv"
import { app } from "./app.js";
import connectDB from "./db/dbConnection.js";

let port=3000

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

app.listen(port,()=>{
    console.log(`Server is running at port : ${process.env.PORT}`);
});
