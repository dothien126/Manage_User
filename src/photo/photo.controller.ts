import * as photoService from './photo.service';
import * as albumService from '../album/album.service';
import * as UserService from '../user/user.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from '../utils/response/customSuccess';
import { Request, NextFunction } from 'express';
import { Photo } from './photo.entity';
import { Album } from '../album/album.entity';
import { User } from '../user/user.entity';
import path from 'path';

export const addPhoto = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const link = path.join('..public/upload.image', req.file.originalname);
    const newPhoto = new Photo();

    newPhoto.link = link;

    const rs = await photoService.upPath(link, newPhoto);
    await rs.save();
    res.customSuccess(201, 'Upload photo succesfully.', rs);
  } catch (error) {
    next(error);
  }
};

export const photoList = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const photoList = await photoService.getAllPhoto({});
    if (!photoList) {
      const customError = new CustomError(
        400,
        'General',
        `Can't retrieve list of photos`
      );
      return next(customError);
    }
    res.customSuccess(200, 'List of photo.', photoList);
  } catch (err) {
    next(err);
  }
};

export const photoId = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const photo = await photoService.findPhotoById(id);

    if (!photo) {
      const customError = new CustomError(
        404,
        'General',
        `Photo with id:${id} not found.`
      );
      return next(customError);
    }
    res.customSuccess(200, 'Photo information', photo);
  } catch (err) {
    next(err);
  }
};

export const photoUpdate = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const photo = await photoService.findPhotoById(id);
    if (!photo) {
      const customError = new CustomError(
        404,
        'General',
        `Photo with id:${id} not found.`
      );
      return next(customError);
    }

    await photoService.updatePhoto(id, req.body);
    res.customSuccess(200, 'Photo successfully saved.', photo);
  } catch (err) {
    next(err);
  }
};

export const photoDelete = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
): Promise<void> => {
  try {
    const id = req.params.id;
    const photo = await photoService.findPhotoById(id);
    if (!photo) {
      const customError = new CustomError(
        404,
        'General',
        `Photo with id:${id} doesn't exists.`
      );
      return next(customError);
    }

    await photoService.deletePhotoById(id);
    return res.customSuccess(200, 'Photo delete successfully.', '@');
  } catch (err) {
    next(err);
  }
};

export const addPhotoUser = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { userId, photoId } = req.params;
    const user = await UserService.findUserById(userId);
    const photo = await photoService.findPhotoById(photoId);
    if (user && photo) {
      user.photos = [photo];
      await user.save();
      res.customSuccess(200, 'All album of user.', user.photos);
    } else {
      const customError = new CustomError(
        404,
        'General',
        `User or album not found`
      );
      return next(customError);
    }
  } catch (error) {
    next(error);
  }
};

export const addPhotoAlbum = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { albumId, photoId } = req.params;
    const album = await albumService.findAlbumById(albumId);
    const photo = await photoService.findPhotoById(photoId);
    if (photo && album) {
      album.photos = [photo];
      await album.save();
      res.customSuccess(200, 'All album of user.', album.photos);
    } else {
      const customError = new CustomError(
        404,
        'General',
        `User or album not found`
      );
      return next(customError);
    }
  } catch (error) {
    next(error);
  }
};
