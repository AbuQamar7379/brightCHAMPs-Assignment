import httpStatus from "http-status";

import { ApiError } from "../utils/ApiError";
import { User } from "../models";
import { UserDocument } from "../models/user.model";

/**
 * Interface for user authentication properties required during registration.
 *
 * @interface UserAuthProps
 * @property {string} fullName - The full name of the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
interface UserAuthProps {
  fullName?: string;
  username: string;
  password: string;
  tokenId?: string;
}

/**
 * Registers a new user by checking if the username already exists and then saving the new user.
 *
 * @param {UserAuthProps} param0 - Object containing the user details for registration.
 * @returns {Promise<User>} - Returns the newly created user object.
 * @throws {ApiError} - Throws an error if the user already exists or if there is an issue during registration.
 */
const registerUser = async ({
  fullName,
  username,
  password,
}: UserAuthProps): Promise<UserDocument> => {
  try {
    let user = await findUserByUsername(username);

    if (user) {
      throw new ApiError(
        `User already exists, Please login!`,
        httpStatus.BAD_REQUEST
      );
    }

    user = new User.Model({ fullName, username, password });

    if (!user) {
      throw new ApiError(
        `Something went wrong please try again.`,
        httpStatus.BAD_REQUEST
      );
    }

    user.password = await user.hashPassword(user.password);
    await saveDocument(user);

    return user;
  } catch (err: any) {
    throw new ApiError(
      `Error: ${err.message}`,
      err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Authenticates a user by verifying their username and password.
 * This function also checks the validity of the provided token ID to ensure that the user is authorized.
 *
 * @param {UserAuthProps} param0 - Object containing user authentication details.
 * @param {string} param0.username - The username of the user attempting to log in.
 * @param {string} param0.password - The password provided by the user for authentication.
 * @param {string} [param0.tokenId] - Optional token ID for additional authorization checks (e.g., session validation).
 *
 * @returns {Promise<UserDocument>} - Returns the authenticated user object if login is successful.
 * @throws {ApiError} - Throws an error if:
 * - The user does not exist (`User doesn't exist, try registering first or username is incorrect`).
 * - The token ID does not match the user’s ID (`Unauthorized access`).
 * - The provided password is incorrect (`Incorrect password`).
 *
 */
const loginUser = async ({
  username,
  password,
  tokenId,
}: UserAuthProps): Promise<UserDocument> => {
  try {
    let user = await findUserByUsername(username);

    if (!user) {
      throw new ApiError(
        `User doesn't exist, try registering first or username is incorrect`,
        httpStatus.BAD_REQUEST
      );
    }

    if (String(user._id) !== tokenId) {
      throw new ApiError(`Unauthorized access`, httpStatus.FORBIDDEN);
    }

    if (!(await user.comparePassword(password))) {
      throw new ApiError("Incorrect password", httpStatus.BAD_REQUEST);
    }

    return user;
  } catch (err: any) {
    throw new ApiError(
      `Error: ${err.message}`,
      err.statusCode || httpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

/**
 * Finds a user by their username.
 *
 * @param {string} username - The username of the user to be found.
 * @returns {Promise<User | null>} - Returns the user object if found, or null if not.
 */
const findUserByUsername = async (
  username: string
): Promise<UserDocument | null> => await User.Model.findOne({ username });

/**
 * Saves a Mongoose document to the database.
 *
 * @param {Document} doc - The Mongoose document to be saved.
 * @returns {Promise<Document>} - Returns the saved document.
 */
const saveDocument = async (doc: UserDocument): Promise<UserDocument> =>
  await doc.save();

export { registerUser, loginUser };
