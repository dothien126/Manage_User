import { User } from './user.entity';
import { getRepository } from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { Album } from '../album/album.entity';

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

// find User by email
export const findUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { email } });
};

// find User by username
export const findUserByUserName = async (
  userName: string
): Promise<User | undefined> => {
  const userRepository = getRepository(User);
  return userRepository.findOne({ where: { userName } });
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

// add photo to user
// export const addPhotoToUser = async (photoId: string, user: User): Promise<User> => {
//   const userRepository = getRepository(User);
//   const newUser: User[] = [];
//   user.photoId = photoId
//   newUser.push(photoId)
//   return userRepository.save(user)
// }

// add album to user
export const getAllALbumOfUser = async (id: string): Promise<User[]> => {
  const userRepository = getRepository(User);
  return await userRepository.find({
    relations: ['Album'],
  });
};
