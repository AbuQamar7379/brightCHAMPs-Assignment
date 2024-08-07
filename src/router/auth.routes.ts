import { Router, Request, Response } from "express";

import { authController } from "../controllers";
import { validate } from "../middlewares";
import { authValidation } from "../validations";

const router = Router();

/**
 * Route handler for user registration.
 * @route POST /register
 * @param {Request} req - The Express request object. This object contains the user's registration details in the request body.
 * @param {Response} res - The Express response object. This object is used to send the HTTP response back to the client.
 * @middleware {validate.body} - Middleware function to validate the request body against the registration schema.
 * @middleware {authValidation.register} - Joi validation schema for user registration.
 * @returns {void} - Sends a response with the status of the registration process.
 */
router.post(
  "/register",
  validate.body(authValidation.register),
  (req: Request, res: Response) => authController.register(req, res)
);

export default router;
