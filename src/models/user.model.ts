import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

/**
 * Interface representing a User document.
 * @interface UserDocument
 * @extends Document
 * @property {string} fullName - The full name of the user.
 * @property {string} username - The unique username of the user.
 * @property {string} password - The password of the user.
 * @property {string} _id - The unique identifier for the user document (automatically provided by MongoDB).
 * @method {Promise<string>} hashPassword - Method to hash the user's password.
 */
interface UserDocument extends Document {
  fullName: string;
  username: string;
  password: string;
  _id: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string): Promise<boolean>;
}

/**
 * Mongoose schema for the User document.
 * @const {mongoose.Schema<UserDocument>}
 * @description Defines the schema for the User model, including validation and default settings.
 * @property {string} fullName - The full name of the user (required).
 * @property {string} username - The unique username of the user (required and unique).
 * @property {string} password - The password of the user (required).
 * @property {Date} createdAt - Timestamp for when the document was created (automatically managed by Mongoose).
 * @property {Date} updatedAt - Timestamp for when the document was last updated (automatically managed by Mongoose).
 */
const userSchema = new mongoose.Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Hashes the password for the User document.
 * @method hashPassword
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - The hashed password.
 */
userSchema.methods.hashPassword = async function (
  password: string
): Promise<string> {
  const salt: string = await bcrypt.genSalt(10);
  const hashedPassword: string = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Method to compare user's hashed password.
 * @method comparePassword
 * @memberof UserDocument
 * @param {string} password - The password to compare.
 * @returns {Promise<boolean>} A promise that resolves with the comparison result.
 */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

/**
 * Mongoose model for the User document.
 * @const {Model<UserDocument>}
 * @description Represents the User collection in MongoDB with schema validation and document methods.
 */
const userModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export { userModel, UserDocument };
