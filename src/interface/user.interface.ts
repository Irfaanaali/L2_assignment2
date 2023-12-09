import { Model } from 'mongoose';

export interface IFullname {
  firstName: string;
  lastName: string;
}

export interface IAddress {
  street: string;
  city: string;
  country: string;
}

interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: IFullname;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
}

interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  withoutPassword(userId: string): Promise<IUser | null>;
  // eslint-disable-next-line no-unused-vars
  deleteUser(userId: string): Promise<IUser | null>;
  // eslint-disable-next-line no-unused-vars
  updateUser(userId: string, userData: IUser): Promise<IUser | null>;

  // eslint-disable-next-line no-unused-vars
  newid(userId: string): Promise<string>;

  // eslint-disable-next-line no-unused-vars
}

export { IUserModel, IUser };
