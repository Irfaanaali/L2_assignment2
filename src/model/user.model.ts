import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import {
  IAddress,
  IFullname,
  IUser,
  IUserModel,
} from '../interface/user.interface';

const fullnameSchema = new Schema<IFullname>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
const userSchema = new Schema<IUser, IUserModel>({
  userId: {
    type: Number,
    required: true,
    unique: true,
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
  fullName: {
    type: fullnameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
});

userSchema.statics.withoutPassword = async function (
  userId: number,
): Promise<IUser | null> {
  return this.findOne({ userId: userId }, { password: 0 });
};

userSchema.statics.deleteUser = async function (
  userId: number,
): Promise<IUser | null> {
  const result = this.findOneAndDelete({ userId: userId });
  return result;
};
userSchema.statics.updateUser = async function (
  userId: number,
  userData: IUser,
): Promise<IUser | null> {
  const filter = { userId: userId };
  return this.findOneAndUpdate(filter, userData);
};

userSchema.statics.newid = async function (
  userId: string,
): Promise<string | undefined> {
  const filter = { userId: parseInt(userId) };

  const ee = await this.findOne(filter);

  const kk = ee?._id;

  const pp = kk?.toString();

  return pp;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; 
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

const user = model<IUser, IUserModel>('User', userSchema);
export default user;
