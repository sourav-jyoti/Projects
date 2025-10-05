"use client";
import React from "react";
import { useRef, useEffect } from "react";
import { game } from "@/draw/game";

export default function Canvas({
   roomId,
   socket,
}: {
   roomId: string;
   socket: boolean;
}) {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      if (canvasRef.current) {
         game(canvasRef.current);
      }
   }, [canvasRef]);

   return (
      <div>
         <canvas ref={canvasRef} width={900} height={600}></canvas>
      </div>
   );
}
