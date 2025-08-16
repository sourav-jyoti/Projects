import dotenv from "dotenv"
dotenv.config();

import {Types} from 'mongoose'
import express from "express";
import jwt from "jsonwebtoken"
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import {random} from "./utils.js"

const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3000;

//must have express middlewares
app.use(express.json())


//routes
app.post("/api/v1/signup",async(req,res)=>{

    const { uname, pass } = req.body;

    try{
        await UserModel.create(
            {
                username:uname,
                password:pass
            }
        )
        res.json({
            message:"User signed up"
        })
    }
    catch(error){
        res.status(500).json({
            message:"error signing up"
        })
    }
})


app.post("/api/v1/signin",async(req,res)=>{
    
    const {uname,pass} = req.body;
    
    //find if the user exists and if exists it returns object containing the stored details
    const existingUser = await UserModel.findOne({
        username:uname,
        password:pass
    })
    
    if(existingUser){
        const token = jwt.sign({
            id:existingUser._id
        },process.env.JWT_PASS)
        
        
        res.json({
            message:"user signed in ",
            token
        })
    }
    else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    } 
})


app.use(userMiddleware)
//all the below routes will use this userMiddlewares


app.post("/api/v1/content",async(req,res)=>{

    const {type,link,title,tags=[]} = req.body; //tags = [] tells if users send empty tags than create an empty array for tags

    try {
        await ContentModel.create({
            userId:req.userId,
            type:type,
            link:link,
            title:title,
            tags:tags
        })
        
        res.json({
            message:"Content added"
        })

    } catch (error) {
        res.status(500).json({
            message: "Some error occurred",
            error
        });
    }
    
})

app.get("/api/v1/content",async(req,res)=>{
    
    try {
        const userId = req.userId;
        const content = await ContentModel.find({
            userId: userId
        }).populate("userId","username")
    
        res.json({
            content
        })
    } catch (error) {
        res.status(500).json({
            message:"error fetching"
        })
    }
})


app.delete("/api/v1/content",async(req,res)=>{

    try {

        const msg = await ContentModel.deleteMany({
            _id: new Types.ObjectId(`${req.body.contentId}`),
            userId: new Types.ObjectId(`${req.userId}`)

            //Delete all documents where contentId equals <value> AND userId equals <value>
        })

        res.json({
            message:"deleted successfully",
            msg:msg
        })
        
    } catch (error) {
        res.json({
            message:"error deleting "
        })
    }


})

app.post("/api/v1/brain/share",async(req,res)=>{
    
    const share = req.body.share;
    
    //if share is true 
    if(share){
        //if link already exist in db then return the link
        const existingLink = await LinkModel.findOne({
            userId:req.userId
        })

        if(existingLink){
            res.json({
                link: `/api/v1/brain/${existingLink.hash}`
            })
        }

        const hash = random(10);
        await LinkModel.create({
            userId:req.userId,
            hash: hash
        })

        res.json({
            link : `/api/v1/brain/${hash}`
        })

       
        
    }
    else{
        await LinkModel.deleteOne({
            userId: req.userId
        });
    }
})

app.get("/api/v1/brain/:sharelink",async(req,res)=>{
})



//port 
try {
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`);
    })

} catch (error) {
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
