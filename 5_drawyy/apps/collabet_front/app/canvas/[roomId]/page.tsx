import React from "react";
import RoomCanvas from "@/components/RoomCanvas";

export default function Page({ params }: { params: { roomId: string } }) {
   const roomId = params.roomId;

   return (
      <div>
         <RoomCanvas roomId={roomId} />
      </div>
   );
}

/**Page({ params }: { params: { roomId: string } } === Page function is expecting an object that contains roomid which is string
 * print what is inside params const d: any = JSON.stringify(params); //it must be stringified other can't display on browser
 *
 */
