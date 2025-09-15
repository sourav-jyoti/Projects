import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
import { userMiddleware } from "@repo/jsonwebtoken-verify/middleware";
import { prismaClient } from "@repo/db/client";

import {
   SignupSchema,
   SigninSchema,
   CreateRoomSchema,
} from "@repo/zod-types/types";

const app = express();

app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
   const parsedData = SignupSchema.safeParse(req.body);

   if (!parsedData.success) {
      return res.json({
         msg: "incorrect inputs",
      });
   }

   //hashing the pass
   const hashedPass = await bcrypt.hash(parsedData.data.password, 10);

   //if data is parsed properly than make a entry in the db , if user already exists i.e email must be unique as per schema or other reason than error
   try {
      const newuser = await prismaClient.user.create({
         data: {
            email: parsedData.data.email,
            uname: parsedData.data.uname,
            password: hashedPass, //store hashed pass
         },
      });
      res.json({
         userId: newuser.id,
      });
   } catch (e) {
      res.json({
         msg: "some error occurred while signing",
      });
   }
});

//take input from client -> check if user present in db -> if present return jwttoken
app.post("/api/v1/signin", async (req, res) => {
   const parsedData = SigninSchema.safeParse(req.body);

   if (!parsedData.success) {
      return res.json({
         msg: "incorrect inputs",
      });
   }

   const newuser = await prismaClient.user.findFirst({
      where: {
         uname: parsedData.data.uname,
      },
   });

   if (!newuser) {
      return res.json({ msg: "user not found signup first" });
   }

   //compare the plain password with the hashed pass stored in db
   const isPassValid = await bcrypt.compare(
      parsedData.data.password,
      newuser.password
   );

   if (!isPassValid) {
      res.json({ msg: "invalid pass" });
   }

   const token = jwt.sign({ userId: newuser.id }, process.env.JWT_PASS);

   res.json({
      msg: "login successfull",
      token: token,
   });
});

//////////////////////////// usermiddleware is used below///////////////////////////////////////////

app.use(userMiddleware);

app.post("/api/v1/createroom", async (req, res) => {
   const parsedData = CreateRoomSchema.safeParse(req.body);

   if (!parsedData.success) {
      return res.json({
         msg: "incorrect inputs",
      });
   }

   const userId = req.userId;

   try {
      const room = await prismaClient.room.create({
         data: {
            slug: parsedData.data.slug,
            adminId: userId,
         },
      });

      res.json({
         roomId: room.id,
      });
   } catch (e) {
      res.status(411).json({
         msg: "error in creating room , room already exists",
      });
   }
});

//this route will be used to join the join -- called automatically by client after client receives roomId -- and roomId can be varibale
app.post("/api/v1/:roomId", async (req, res) => {
   const roomId = Number(req.params.roomId);

   try {
      //fetch 1000 msg from the db and forward to client
      const msg = await prismaClient.chat.findMany({
         where: { roomId: roomId },
         orderBy: { id: "desc" },
         take: 1000,
      });

      res.json({ msg });
   } catch (e) {
      res.json({
         msg: "some error happened",
      });
   }
});

//this endpoint will be used if a any client wants to join any room based on the slug(room name) it will return the roomId
app.post("/api/v1/:slug", async (req, res) => {
   const slug = req.body;

   try {
      const roomId = prismaClient.room.findUnique({
         where: {
            slug,
         },
      });

      res.json({
         roomId,
      });
   } catch (e) {
      res.json({ msg: "some error happened" });
   }
});

app.listen(3001); //don't use 3000 as it used by nextjs server
