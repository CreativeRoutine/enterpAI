import { Schema, model, models, Document } from "mongoose";

const roles = ["owner", "user", "moderator", "admin"] as const;

type Role = (typeof roles)[number]; // 'owner' | 'user' | 'special' | 'moderator' | 'admin' | 'superadmin' |   for security reasons...

export interface IUser {
  name: string;
  username: string;
  email: string;
  image?: string;
  nativeLang?: string;
  learningLang?: string;
  location?: string;
  role?: Role;
  roleUpdatedAt?: Date | null;
  isBanned?: boolean;
}

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    nativeLang: { type: String },
    learningLang: { type: String },
    location: { type: String },
    role: { type: String, enum: roles, default: "user" }, // Default is normal user
    roleUpdatedAt: { type: Date, default: null }, // Promotion Date
    isBanned: { type: Boolean, default: false }, // Ban
  },
  { timestamps: true }
);

// const User = models?.user || model<IUser>("User", UserSchema);
const User = models.User || model<IUser>("User", UserSchema);

export default User;
