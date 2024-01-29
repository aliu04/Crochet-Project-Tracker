import express from "express";
import { mongodDBURL } from "./config.js";
import mongoose from "mongoose";
import { Project } from "./models/projectModel.js";
import cors from 'cors';
import router from "./routes.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/projects', router)

mongoose
  .connect(mongodDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(4000, () => {
      console.log("Server Started on port 4000");
    });

  })
  .catch((error) => {
    console.log(error)
  });