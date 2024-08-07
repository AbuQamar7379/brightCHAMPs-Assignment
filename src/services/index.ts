import { registerUser, loginUser } from "./auth.service";
import { generateAuthToken } from "./token.service";

// Export an object with multiple authentication service methods
export const authService = { registerUser, loginUser };

// Export an object with multiple token service methods
export const tokenService = { generateAuthToken };
