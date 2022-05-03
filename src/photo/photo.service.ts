import { Photo } from './photo.entity';
import { getRepository } from 'typeorm';

// get all photo
export const getAllPhoto = async ({}): Promise<Photo[]> => {
  const photoRepository = getRepository(Photo);
  const photos = photoRepository.find({});
  return photos;
};

// get photo by id
export const findPhotoById = async (id: string): Promise<Photo | undefined> => {
  const photoRepository = getRepository(Photo);
  return photoRepository.findOne({ where: { id } });
};

// create a new photo
export const createNewPhoto = async (photo: Photo): Promise<Photo> => {
  const photoRepository = getRepository(Photo);
  const newPhoto = await photoRepository.save(photo);
  return newPhoto;
};

// update photo with id
export const updatePhoto = async (id: string, photo: Photo): Promise<Photo> => {
  const photoRepository = getRepository(Photo);
  photo.id = id;
  return photoRepository.save(photo);
};

// delete photo by id
export const deletePhotoById = async (id: string): Promise<void> => {
  const photoRepository = getRepository(Photo);
  await photoRepository.delete(id);
  return;
};

// update photo
export const upPath = async ( link: string, photo: Photo): Promise<Photo> => {
  const photoRepository = getRepository(Photo);
  photo.link = link;
  return photoRepository.save(photo);
};

