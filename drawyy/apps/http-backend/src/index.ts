import express from "express";

const app = express();

app.use(express.json());

app.post("/api/v1/signin", async (req, res) => {});

app.get("/api/v1/sigup", async (req, res) => {});

app.listen(3001); //don't use 3000 as it used by nextjs server
