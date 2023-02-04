import express from "express";
import bodyParser from "body-parser";
import usersRoutes from "./routes/users.js";
//const express = require("express");
const app = express();
const port = 3000;

// Initialize an empty memory store
let memoryStore = {};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  // Extract jobid and jobValue from the request
  let jobid = req.body.jobid || req.query.jobid;
  let jobValue = req.body.jobValue || req.query.jobValue;

  // Add the key-value pair to the memory store
  memoryStore[jobid] = jobValue;

  // Return a success response
  res.status(200).json({ stat: "ok" });
});

app.get("/all", (req, res) => {
  // Extract jobValue from the request
  let jobValue = req.query.jobValue;

  // Filter the memory store to include only jobs with jobValue greater than or equal to the specified value
  let filteredJobs = Object.entries(memoryStore).filter(([id, value]) => value >= jobValue);

  // Sort the filtered jobs by jobValue in ascending order
  filteredJobs.sort((a, b) => a[1] - b[1]);

  // Return the sorted jobs
  res.status(200).json(filteredJobs);
  //res.send(filteredJobs);
});

app.post("/remove", (req, res) => {
  // Extract jobid from the request
  let jobid = req.body.jobid || req.query.jobid;

  // Delete the job from the memory store
  delete memoryStore[jobid];

  // Return a success response
  res.status(200).json({ stat: "ok" });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
