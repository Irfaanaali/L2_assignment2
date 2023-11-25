import { IUser } from '../interface/user.interface';
import user from '../model/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  const result = await user.create(userData);

  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await user
    .find()
    .select('username age fullname email address ');
  return result;
};


export const userService = {
  createUser,
  getAllUsers,

};
