import Joi from "joi";

/**
 * Custom Joi validation function to validate password strength.
 *
 * @param {string} value - The password string that needs to be validated.
 * @param {Joi.CustomHelpers} helpers - An object provided by Joi that contains utility methods for creating validation errors.
 * @returns {string | Joi.CustomHelpers} - Returns the validated password if it meets the criteria, or an error if it does not.
 */
const password = (value: string, helpers: Joi.CustomHelpers) => {
  // Check if the password is at least 8 characters long
  if (value.length < 8) {
    return helpers.error("Password must be at least 8 characters long");
  }

  // Check if the password contains at least one letter and one number
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.error(
      "Password must contain at least 1 letter and 1 number"
    );
  }

  // Return the valid password if all checks pass
  return value;
};

export { password };
