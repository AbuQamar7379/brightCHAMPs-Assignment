import { register, login, resetPassword } from "./auth.controller";

// Export an object with multiple authentication controller methods
export const authController = {
  register,
  login,
  resetPassword
};
