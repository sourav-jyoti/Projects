import dotenv from "dotenv";
dotenv.config();

//we can't use the jsonwebtoken-verify/middleware here , the way we use middleware like calling next() in express specific -- is not a syntax applicable in websockets
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"; //This way JwtPayload is treated as a type only, no runtime error.
import { prismaClient } from "@repo/db/client";

//jwtHandler

function jwtmiddleware(token: string): string | null {
   try {
      if (!token || Array.isArray(token)) {
         return null;
      }
      const decoded = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;

      if (!decoded.userId) {
         return null;
      }

      return decoded.userId;
   } catch (e) {
      return "error decoding";
   }
}

const wss = new WebSocketServer({ port: 8080 });

// interface User {
//    ws: WebSocket;
//    rooms: string[];
//    userId: string;
// }

// const users: User[] = [];

// // wss.on("connection", (ws, req) => {
// //    userMiddleware(ws, req, () => {
// //       // only run this if middleware passes
// //       ws.on("message", (data) => {
// //          ws.send("pong");
// //       });
// //    });
// // });
