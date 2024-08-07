import express, { Application } from "express";
import cors from "cors";
import userAuthSystemRouter from "./router";

const app: Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable cross-origin requests
app.use(cors());

// Mounting the router at the "/api" endpoint
app.use("/api", userAuthSystemRouter);

export default app;
