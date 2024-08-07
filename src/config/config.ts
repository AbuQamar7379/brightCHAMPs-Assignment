import dotenv from "dotenv";
import path from "path";
import Joi, { ObjectSchema } from "joi";

// Load environment variables from .env file -> outside src dir
dotenv.config({ path: path.join(__dirname, "../../.env") });

/**
 * Environment variables schema for configuration validation.
 * @type {ObjectSchema}
 */
const envVarsSchema: ObjectSchema = Joi.object()
  .keys({
    PORT: Joi.number().description("Port number"),
    MONGO_URI: Joi.string().description("MongoDB URI"),
    SECRET_KEY: Joi.string().description("Secret key"),
  })
  .unknown();

// Validate environment variables against schema
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error("Config validation error: " + error.message);
}

/**
 * Configuration object containing environment variables.
 * @typedef {Object} Config
 * @property {string | undefined} [PORT] - Port number for the server.
 * @property {string | undefined} [MONGO_URI] - MongoDB connection URI.
 * @property {string | undefined} [SECRET] - Secret key.
 */
interface Config {
  PORT: number;
  MONGO_URI: string;
  SECRET: string;
}

/**
 * Resolved configuration object with validated environment variables.
 * @type {Config}
 */
export const config: Config = {
  PORT: envVars.PORT,
  MONGO_URI: envVars.MONGO_URI,
  SECRET: envVars.SECRET_KEY,
};
