//function of this middleware is to verify the token based on the jwt secret and extracts userid
//it doesn't double checks whether it exits or not in db

import dotenv from "dotenv";
dotenv.config();

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const header = req.headers["authorization"];

   if (!header || Array.isArray(header)) {
      return res.status(403).json({
         message: "header is empty or array",
      });
   }

   const decoded = jwt.verify(header, process.env.JWT_PASS) as JwtPayload;

   if (decoded && decoded.id) {
      req.userId = decoded.id;
      next(); //calling next function after checking
   } else {
      res.status(403).json({
         message: "You are not logged in",
      });
   }
};
