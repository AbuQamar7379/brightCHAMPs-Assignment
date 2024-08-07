import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";

/**
 * Middleware to validate the request body against a Joi schema.
 * @param {Joi.Schema<any>} schema - The Joi schema used to validate the request body. This schema defines the expected structure and constraints of the request body.
 * @returns {(req: Request, res: Response, next: NextFunction) => void} - Returns a middleware function that:
 * - Validates the request body against the provided Joi schema.
 * - Sends a 400 (Bad Request) response with the validation error message if validation fails.
 * - Calls the `next` function to proceed to the next middleware or route handler if validation succeeds.
 */
const validateBody =
  (schema: Joi.Schema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .send({ message: error.message });
    }

    next();
  };

export { validateBody };
