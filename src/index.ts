import mongoose from "mongoose";
import app from "./app";
import { config } from "./config/config";

/**
 * Connects to the MongoDB database and starts the Express server.
 * 
 * This script performs the following actions:
 * 1. Connects to the MongoDB database using the URI specified in the configuration.
 * 2. Logs a message to the console once the connection is successfully established.
 * 3. Starts the Express server and listens on the port specified in the configuration.
 * 4. Logs the server's running status to the console.
 * 
 * @function
 * @returns {void}
 * @throws {Error} - Logs an error message if the connection to MongoDB fails.
 */
mongoose
  .connect(config.MONGO_URI) // Connects to the MongoDB database using the URI from the config
  .then(() => {
    console.log("MongoDB connected");

    app.listen(config.PORT, () =>
      console.log(`Server is running at ${config.PORT}`)
    );
  })
  .catch((err) => console.log("Failed to connect DB", err.message));
