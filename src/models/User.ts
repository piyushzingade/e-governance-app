import mongoose, { Schema, Document } from "mongoose";

enum Role {
  Student = "Student",
  Admin = "Admin",
  
}

export interface UserInterface extends Document {
  username: string;
  email: string;
  password: string;
  filledForm?: boolean;
  admitted?: boolean;
  role?: Role;
}

// Define the  Schema
const userSchema = new Schema<UserInterface>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    filledForm: {
      type: Boolean,
      default: false,
    },

    admitted: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: "Student",
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);
export default User;
