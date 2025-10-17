type shape =
   | {
        type: "roundrect";
        x: number;
        y: number;
        width: number;
        height: number;
        radii?: number;
     }
   | {
        type: "elip";
     }
   | {
        type: "line";
     };

export function game(canvas: HTMLCanvasElement) {
   const ctx = canvas.getContext("2d");
   let existingShape: shape[] = [];

   if (!ctx) {
      return;
   }
   ctx.strokeStyle = "white";
   let clicked = false; //to track mouse is clicked or not
   let startx = 0;
   let starty = 0;

   canvas.addEventListener("mousedown", (e) => {
      clicked = true;
      startx = e.clientX;
      starty = e.clientY;
   });

   canvas.addEventListener("mousemove", (e) => {
      //if clicked and draged then only listen to its position
      if (clicked) {
         const width = e.clientX - startx; //gives the width
         const height = e.clientY - starty; //gives height

         drawExistingShapes(existingShape, canvas, ctx);

         ctx.beginPath();
         ctx.roundRect(startx, starty, width, height, [10]);
         ctx.stroke();
      }
   });

   canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width = e.clientX - startx; //gives the width
      const height = e.clientY - starty; //gives height

      //as soon as mouse is released push the drawing to the array
      existingShape.push({
         type: "roundrect",
         x: startx,
         y: starty,
         height,
         width,
      });
      drawExistingShapes(existingShape, canvas, ctx);
   });
}
let a = 0;
//function to print all the existingshapes[] stored
function drawExistingShapes(
   existingshapes: shape[],
   canvas: HTMLCanvasElement,
   ctx: CanvasRenderingContext2D
) {
   ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the previous
   console.log(existingshapes);

   console.log(a++);

   existingshapes.map((shape) => {
      if (shape.type === "roundrect") {
         ctx.beginPath();
         ctx.roundRect(shape.x, shape.y, shape.width, shape.height, [10]);
         ctx.stroke();
      }
   });
}

//roundRect(x, y, width, height, radii)
