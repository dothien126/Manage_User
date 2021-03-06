import * as albumService from './album.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from '../utils/response/customSuccess';
import { Request, NextFunction } from 'express';
import { Album } from './album.entity';
import * as UserService from '../user/user.service'

export const createAlbum = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body;
    const album = await albumService.findAlbumByName(name);

    if (album) {
      const customError = new CustomError(
        400,
        'General',
        `Album ${album.name} has already`
      );
      return next(customError);
    }

    const newAlbum = new Album();
    newAlbum.name = name;
    newAlbum.description = description;
    await albumService.createNewAlbum(newAlbum);
    return res.customSuccess(201, 'Album successfully created.', newAlbum);
  } catch (err) {
    next(err);
  }
};

export const albumList = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const albumList = await albumService.getAllAlbum({});
    if (!albumList) {
      const customError = new CustomError(
        400,
        'General',
        `Can't retrieve list of albums`
      );
      return next(customError);
    }
    res.customSuccess(200, 'List of albums.', albumList);
  } catch (err) {
    next(err);
  }
};

export const albumId = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const album = await albumService.findAlbumById(id);

    if (!album) {
      const customError = new CustomError(
        404,
        'General',
        `Album with id:${id} not found.`
      );
      return next(customError);
    }
    res.customSuccess(200, 'Album information', album);
  } catch (err) {
    next(err);
  }
};

export const albumUpdate = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const album = await albumService.findAlbumById(id);
    if (!album) {
      const customError = new CustomError(
        404,
        'General',
        `Album with id:${id} not found.`
      );
      return next(customError);
    }

    await albumService.updateAlbum(id, req.body);
    res.customSuccess(200, 'Album successfully saved.', album);
  } catch (err) {
    next(err);
  }
};

export const albumDelete = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const album = await albumService.findAlbumById(id);
    if (!album) {
      const customError = new CustomError(
        404,
        'General',
        `Album with id:${id} doesn't exists.`
      );
      return next(customError);
    }

    await albumService.deleteAlbumById(id);
    return res.customSuccess(200, 'Album delete successfully.', '');
  } catch (err) {
    next(err);
  }
};

export const addAlbumUser = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const {userId, albumId} = req.params;
    const user = await UserService.findUserById(userId)
    const album = await albumService.findAlbumById(albumId)
    if(user && album) {
      user.albums = [album]
      await user.save()
      res.customSuccess(200, 'All album of user.', user.albums);
    } else {
      const customError = new CustomError(
        404,
        'General',
        `User or album not found`
      );
      return next(customError);
    }
  } catch (error) {
    next(error)
  }
};

export const getAllPhotoOfAnAlbum = async (req:Request, res:CustomResponse, next:NextFunction) => {
  try {
    const {id} = req.params;
    const album = await albumService.findAlbumById(id)
    if (!album) {
      const customError = new CustomError(
        404,
        'General',
        `Album with id:${id} doesn't exists.`
      );
      return next(customError);
    }
    const rs = await albumService.getAllPhotoOfAlbum(id); // return be like [{a}, {b}, {c}]
    if(!rs) {
      const customError = new CustomError(
        404,
        'General',
        `Album don't have any photo.`
      );
      return next(customError);
    }
    return res.customSuccess(200, 'User deleted.', rs);
  } catch (error) {
    next(error)
  }
}

