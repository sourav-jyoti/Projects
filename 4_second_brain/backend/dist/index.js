import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./db.js";
const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000;
//must have express middlewares
app.use(express.json());
//routes
app.post("/api/v1/signup", async (req, res) => {
    const { uname, pass } = req.body;
    try {
        await UserModel.create({
            username: uname,
            password: pass
        });
        res.json({
            message: "User signed up"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "error signing up"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const { uname, pass } = req.body;
    //find if the user exists
    const existingUser = await UserModel.findOne({
        username: uname,
        password: pass
    });
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_PASS);
        res.json({
            message: "user sign in ",
            token
        });
    }
    else {
        res.status(403).json({
            message: "incorrect credentials"
        });
    }
});
app.post("/api/v1/content", async (req, res) => {
});
app.get("/api/v1/content", async (req, res) => {
});
app.delete("/api/v1/content", async (req, res) => {
});
app.post("/api/v1/brain/share", async (req, res) => {
});
app.get("/api/v1/brain/:sharelink", async (req, res) => {
});
//port 
try {
    app.listen(PORT, () => {
        console.log(`server is running ${PORT}`);
    });
}
catch (error) {
    console.log("error starting");
    process.exit(1);
}
/**
* --next update
**implement cors,jwt,zod
*/
/**
import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json());


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
