import { Router, Request, Response } from "express";

import { authController } from "../controllers";
import { validate } from "../middlewares";
import { authValidation } from "../validations";
import { auth } from "../middlewares/auth";

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

/**
 * Route handler for user login.
 * @route POST /login
 * @param {Request} req - The Express request object. This object contains the user's login details in the request body.
 * @param {Response} res - The Express response object. This object is used to send the HTTP response back to the client.
 * @middleware {auth} - Middleware function to handle authentication checks (e.g., token verification).
 * @middleware {validate.body} - Middleware function to validate the request body against the login schema.
 * @middleware {authValidation.login} - Joi validation schema for user login.
 * @returns {void} - Sends a response with the status of the login process.
 */
router.post(
  "/login",
  auth,
  validate.body(authValidation.login),
  (req: Request, res: Response) => authController.login(req, res)
);

/**
 * Route handler for password reset.
 * @route PATCH /reset-password
 * @param {Request} req - The Express request object. This object contains the user's password reset details in the request body.
 * @param {Response} res - The Express response object. This object is used to send the HTTP response back to the client.
 * @middleware {validate.body} - Middleware function to validate the request body against the password reset schema.
 * @middleware {authValidation.resetPassword} - Joi validation schema for password reset.
 * @returns {void} - Sends a response with the status of the password reset process.
 */
router.patch(
  "/reset-password",
  validate.body(authValidation.resetPassword),
  (req: Request, res: Response) => authController.resetPassword(req, res)
);

export default router;
