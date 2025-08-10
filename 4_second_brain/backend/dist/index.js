import express from "express";
const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000;
try {
    if (Math.random() > 0.9) {
        app.listen(PORT, () => {
            console.log(`server is running ${PORT}`);
        });
    }
    else {
        process.exit(1);
    }
}
catch (error) {
    console.log("error starting");
    process.exit(1);
}
/**
import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json());



app.post("/api/v1/sigup",async (req,res)=>{
//zod validation
    const username = req.body.username;
    const password = req.body.username;

    try{
        await UserModel.create({
            username:username,
            password:password
        })
    
        res.json({
            message:"User signed up"
        })

    }
    catch(e){
        res.status(411).json({
            message:"user exists"
        })
    }
})

app.post("/api/v1/sigin",(req,res)=>{
    
    const username = req.body.username;
    const password = req.body.username;

    const existingUser = await

})

app.post("/api/v1/content",(req,res)=>{
    
})

app.get("/api/v1/content",(req,res)=>{
    
})

app.delete("/api/v1/sigup",(req,res)=>{
    
})

app.listen(3000);
*/
