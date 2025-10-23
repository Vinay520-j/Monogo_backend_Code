import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: false },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
