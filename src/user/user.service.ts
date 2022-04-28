
import { User } from './user.entity';
import { getRepository } from 'typeorm';

// get all users
export const getAllUser = async ({}): Promise<User[]> => {
  const userRepository = getRepository(User);
  const users = userRepository.find({});
  return users;
};

// get user by id
export const findUserById = async (id: string): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { id } });
};

// find User by Username
export const findUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { email } });
};

// create a new user
export const createNewUser = async (user: User): Promise<User> => {
  const userRepository = getRepository(User);
  const newUser = await userRepository.save(user);
  return newUser;
};

// update user
export const updateUser = async (id: string, user: User): Promise<User> => {
  const userRepository = getRepository(User);
  user.id = id;
  return userRepository.save(user);
};

// delete user by id
export const deleteUserById = async (id: string): Promise<void> => {
  const userRepository = getRepository(User);
  await userRepository.delete(id);
  return;
};

const upPathFile = async (id: string, link: string) => {};
