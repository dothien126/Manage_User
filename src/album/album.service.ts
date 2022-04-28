import { Album } from './album.entity';
import { getRepository } from 'typeorm';

// get all album
export const getAllAlbum = async ({}): Promise<Album[]> => {
  const albumRepository = getRepository(Album);
  const albums = albumRepository.find({});
  return albums;
};

// get album by id
export const findAlbumById = async (id: string): Promise<Album | undefined> => {
  const albumRepository = getRepository(Album);
  return albumRepository.findOne({ where: { id } });
};

// create a new album
export const createNewAlbum = async (album: Album): Promise<Album> => {
  const albumRepository = getRepository(Album);
  const newAlbum = await albumRepository.save(album);
  return newAlbum;
};

// update album
export const updateAlbum = async (id: string, album: Album): Promise<Album> => {
  const albumRepository = getRepository(Album);
  album.id = id;
  return albumRepository.save(album);
};

// delete user by id
export const deleteAlbumById = async (id: string): Promise<void> => {
  const albumRepository = getRepository(Album);
  await albumRepository.delete(id);
  return;
};

const upPathFile = async (id: string, link: string) => {};
