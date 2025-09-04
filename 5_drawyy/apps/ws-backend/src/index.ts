import { WebSocketServer } from "ws";
import dotenv from "dotenv";
dotenv.config();
import { userMiddleware } from "@repo/jsonwebtoken-verify/middleware";

const wss = new WebSocketServer({ port: 8080 });

interface User {
   ws: WebSocket;
   rooms: string[];
   userId: string;
}

const users: User[] = [];

wss.on("connection", (ws, req) => {
   userMiddleware(ws, req, () => {
      // only run this if middleware passes
      ws.on("message", (data) => {
         ws.send("pong");
      });
   });
});
