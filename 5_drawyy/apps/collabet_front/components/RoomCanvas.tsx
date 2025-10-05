"use client";

import React from "react";
import { useState } from "react";
import Canvas from "./Canvas";
//1
export default function RoomCanvas({ roomId }: { roomId: string }) {
   // const [socket, setsocket] = useState<WebSocket | null>(null);
   const [socket, setWebSocket] = useState<boolean>(true);

   if (!socket) {
      return <div>Connecting to server....</div>;
   }

   return (
      <>
         <Canvas roomId={roomId} socket={socket} />
      </>
   );
}

//1 {/** RoomCanvas({ roomId }: { roomId: string })     This means RoomCanvas is expecting an object with a roomId property.   */}
