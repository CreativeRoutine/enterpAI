import { model, models, Schema, Types, Document } from "mongoose";

const plans = ["simple", "pro", "moderator", "admin"] as const;

type Plan = (typeof plans)[number]; // 'owner' | 'user' | 'special' | 'moderator' | 'admin' | 'superadmin' |   for security reasons...

export interface IAccount {
  userId: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  plan: Plan;
  providerAccountId: string;
}

export interface IAccountDoc extends IAccount, Document {}

const AccountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
    plan: { type: String, enum: plans, default: "simple" }, // Default is normal user
    providerAccountId: { type: String, required: true },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
