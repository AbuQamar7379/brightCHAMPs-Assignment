import Joi from "joi";

import { password } from "./custom.validation";

/**
 * Validation schema for user registration
 * @type {Joi.ObjectSchema}
 */
const register: Joi.ObjectSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required().custom(password),
});

/**
 * Validation schema for user logging
 * @type {Joi.ObjectSchema}
 */
const login: Joi.ObjectSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export { register, login };
