//function of this middleware is to verify the user

import dotenv from "dotenv"
dotenv.config();
import { NextFunction,Request,Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const userMiddleware = (req: Request, res: Response,next: NextFunction)=>{

    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string,process.env.JWT_PASS) as JwtPayload;

    if(decoded && decoded.id){

        req.userId = decoded.id;
        next()

    }else{
        res.status(403).json({
            message:"You are not logged in"
        })
    }
}

//different ways to remove redunderline from userId and header 
//usecase of jwtpayload