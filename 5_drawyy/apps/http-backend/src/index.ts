import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { userMiddleware } from "@repo/jsonwebtoken-verify/middleware";

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

app.post("/api/v1/signup", async (req, res) => {
   const parsedData = SigninSchema.safeParse(req.body);
   if (!parsedData.success) {
      res.json({
         error: "enter data correctly",
      });
      return;
   }

   //if data is parsed properly than compare in the db whether user is present
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

app.post("/api/v1/createroom", userMiddleware, async (req, res) => {
   const parsedData = CreateRoomSchema.safeParse(req.body);
   if (!parsedData.success) {
      res.json({
         message: "Incorrect inputs",
      });
      return;
   }

   const userId = req.userId;

   //create room and store it in prisma
   try {
   } catch (e) {
      res.status(411).json({
         message: "Room already exists with this name",
      });
   }
});

app.listen(3001); //don't use 3000 as it used by nextjs server
