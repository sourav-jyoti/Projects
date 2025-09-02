import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import {
   CreateProfileSchema,
   SigninSchema,
   CreateRoomSchema,
} from "@repo/zod-types/types";

const app = express();

app.use(express.json());

app.post("/api/v1/signin", async (req, res) => {
   const parsedData = CreateProfileSchema.safeParse(req.body);
   if (!parsedData.success) {
      res.json({
         error: "enter data correctly",
      });
      return;
   }

   //if data is parsed correctly than make entry to db
   try {
      const user = await prismaclient.user.create({});

      res.json({
         userId: user.id,
      });
   } catch (e) {
      res.status(411).json({
         message: "some error occured",
      });
   }
});

app.post("/api/v1/signin", async (req, res) => {
   const parsedData = SigninSchema.safeParse(req.body);
   if (!parsedData.success) {
      res.json({
         error: "enter data correctly",
      });
      return;
   }

   //if data is parsed properly than compare in the db user is present
   const user = await prismaClient.user.findFirst({
      where: {
         email: parsedData.data.username,
         password: parsedData.data.password,
      },
   });

   if (!user) {
      res.status(403).json({
         message: "Not authorized",
      });
      return;
   }

   //if user present send jwttoken signed token as response
   const token = jwt.sign(
      {
         userId: user.id,
      },
      process.env.JWT_PASS
   );

   res.json({
      token,
   });
});

app.get("/api/v1/sigup", async (req, res) => {});

app.listen(3001); //don't use 3000 as it used by nextjs server
