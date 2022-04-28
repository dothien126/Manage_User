import * as photoService from './photo.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from '../utils/response/customSuccess';
import { Request, NextFunction } from 'express';

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
