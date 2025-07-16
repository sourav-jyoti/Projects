import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 3000;


//*connect to db if succesful then start listening
(async() => {
    try {
    connectDB();
    app.listen(PORT,()=> {
        console.log(`SERVER is running ${PORT}`);
    
    })  
} catch (error) {
        console.log(`mongo db connection error`);
        process.exit(1);
    }
})();



// --or-- using .then()
/**
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });
 
 */
