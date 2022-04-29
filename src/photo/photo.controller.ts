import * as photoService from './photo.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from '../utils/response/customSuccess';
import { Request, NextFunction } from 'express';

const addPhoto = async (req: Request, res: CustomResponse, next: NextFunction) => {
  if (!req.file) {
    const customError = new CustomError(
      404,
      'General',
      `Upload file error`
    );
    return next(customError);
  }
  const name = req.file.filename;
  const link = req.file.path;
  const userId = req.user.id;
  try {
    const photo = await photoService.createNewPhoto({name, link, userId});
    await userService.addPhotoToUser(userId, photo);

    return res.customSuccess(200, 'Create photo successfully.', photo)
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send(error);
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
    res.customSuccess(200, 'Phôt information', photo);
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

export const photoDelete = async (req: Request, next: NextFunction) => {
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
  } catch (err) {
    next(err);
  }
};
