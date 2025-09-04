//the userid that is being and extracted by middleware and passed by it is string

declare global {
   namespace Express {
      interface Request {
         userId?: string;
      }
   }
}

export {};
