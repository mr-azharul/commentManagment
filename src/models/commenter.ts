import { IUser } from '../interfaces/User';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('Commenter', User, 'commenter');