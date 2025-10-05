type shape =
   | {
        type: "rect";
        x: number;
        y: number;
        width: number;
        height: number;
     }
   | {
        type: "circle";
        centerx: number;
        centery: number;
        radius: number;
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
         allShapes(existingShape, canvas, ctx);
      }
   });

   canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width = e.clientX - startx; //gives the width
      const height = e.clientY - starty; //gives height

      //as soon as mouse is released push the drawing to the array
      existingShape.push({
         type: "rect",
         x: startx,
         y: starty,
         height,
         width,
      });
   });
}

//function to print all the existingshapes[] stored
function allShapes(
   existingshapes: shape[],
   canvas: HTMLCanvasElement,
   ctx: CanvasRenderingContext2D
) {
   ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the previous

   existingshapes.map((shape) => {
      if (shape.type === "rect") {
         ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
   });
}
