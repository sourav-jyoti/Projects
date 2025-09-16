import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

//we can't use the jsonwebtoken-verify/middleware here , the way we use middleware like calling next() in express specific -- is not a syntax applicable in websockets
import { WebSocket, WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken"; //This way JwtPayload is treated as a type only, no runtime error.
import { prismaClient } from "@repo/db/client";

// /------------------- Types -------------------
interface User {
   ws: WebSocket;
   rooms: Set<string>;
   userId: string;
}

interface IncomingMessage {
   type: "join_room" | "leave_room" | "chat";
   roomId?: string;
   message?: string;
}

// /------------------- Globals -------------------

const users: User[] = [];

// /------------------- JWT Handler -------------------
function jwtmiddleware(token: string): string | null {
   if (!token || Array.isArray(token)) {
      return null;
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_PASS) as JwtPayload;

      return decoded.userId ?? null;
   } catch (e) {
      console.error("JWT verification failed:", e);
      return null;
   }
}

// /------------------- WebSocket Setup -------------------
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
   const token = req.headers["token"] as string;
   const userId = jwtmiddleware(token) as string;

   if (!userId) {
      ws.close(1008, "Invalid or missing token"); // 1008 = Policy Violation
      return;
   }
   //pushing the userId and ws
   const newuser: User = { ws, rooms: new Set(), userId };
   users.push(newuser);

   ws.on("message", (rawData) => handleMessage(ws, userId, rawData));
});

// /------------------- Handlers -------------------
async function handleMessage(ws: WebSocket, userId: string, rawData: any) {
   let data: IncomingMessage;

   try {
      data = JSON.parse(rawData.toString());
   } catch (e) {
      console.log("invalid json received");
      ws.send(JSON.stringify({ type: "error", message: "Invalid JSON" }));
      return;
   }

   const user = users.find((u) => u.ws === ws); //find user based on ws in the users array
   if (!user) return;

   switch (data.type) {
      case "join_room":
         if (!data.roomId) return;
         user.rooms.add(data.roomId);
         console.log(`User ${userId} joined room ${data.roomId}`);
         break;
      case "leave_room":
         if (!data.roomId) return;
         user.rooms.delete(data.roomId);
         console.log(`User ${userId} left room ${data.roomId}`);
         break;
      case "chat":
         if (!data.roomId || !data.message) return;
         try {
            await prismaClient.chat.create({
               data: {
                  roomId: Number(data.roomId),
                  message: data.message,
                  userId,
               },
            });

            //broadcasting the message to every user in the same room except itself
            users.forEach((u) => {
               if (
                  u.ws !== ws &&
                  u.ws.readyState === WebSocket.OPEN &&
                  u.rooms.has(data.roomId!)
               ) {
                  u.ws.send(
                     JSON.stringify({
                        type: "chat",
                        message: data.message,
                        roomId: data.roomId,
                     })
                  );
               }
            });
         } catch (e) {
            console.error("❌ Failed to save chat:", e);
         }
         break;

      default:
         ws.send(
            JSON.stringify({ type: "error", message: "Unknown event type" })
         );
   }
}
