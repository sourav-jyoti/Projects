require('dotenv').config();//required to access the info in .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const { ResumeModel } = require("./db");

const app = express();

//1
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
}));

//2
//3
app.use(express.json());

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.Mongo_url);
    console.log(" MongoDB connected");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1); // Exit from entire index.js if DB connection fails
  }
}

//router endpoints
// commit msg
async function startServer() {
  await connectToDatabase(); // Wait for DB connection
  app.post("/user/resumes", async function (req, res) {
    try {
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: "Title is required" });

      const newResume = await ResumeModel.create({ title });

      res.status(201).json({ _id: newResume._id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  //fetched using id to edit the resume
  app.get("/user/resumes/:id", async (req, res) => {
    try {

      const resume = await ResumeModel.findById(req.params.id);
      //GET /user/resumes/12345 nodejs extracts 12345 from the url and params is responsible for it
      if (!resume) return res.status(404).json({ error: 'Resume not found' });

      res.json(resume);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })

  //updated the resume with data
  app.put("/user/resumes/:id", async function (req, res) {
    try {
      const updateData = req.body;

      // Check if the resume exists first
      const existingResume = await ResumeModel.findById(req.params.id);
      if (!existingResume) {
        return res.status(404).json({ error: "Resume not found" });
      }

      // Update the existing resume
      const updatedResume = await ResumeModel.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },//dynamically adds key value pair based on the frontend data
        { new: true }
      );

      res.status(200).json({ message: "Resume updated successfully", updatedResume });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  })


  //dashboard gets all resumes
  app.get("/resumes", async function (req, res) {

    try {
      const resumes = await ResumeModel.find();
      res.json(resumes);
    } catch (err) {
      console.error("Error fetching resumes:", err); // Log the full error
      res.status(500).json({ error: "Server error", details: err.message });
    }
  })


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
//backend is running on port localhost:3000 locally and on port  when deployed
}



// Run the server
startServer();



{
  /**
   * 1. midlleware allowing 5173
   * 
   * 2.process.env.NODE_ENV === 'production'
        This checks the current environment of your Node.js application.
        process.env.NODE_ENV is typically set to either:
        'development' (when you're working locally)
        'production' (when your app is deployed live on a server)
        So this condition is true if your app is running in production mode 
    *
    *3. Middleware to parse JSON request body // express doesnot know how to interpret the coming json data if we don't write this line req.body will be undefined
   */
}


/**write line 22-24 in vanilla style
 
mongoose.connect(process.env.Mongo_url)
  .then(() => console.log("MongoDB connected"))                  //conditions if failed to connect db error 
  .catch((err) => console.error("MongoDB connection error:", err));


 */
