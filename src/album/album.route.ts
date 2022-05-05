import { Router } from 'express';

import { albumList, albumId, albumUpdate, albumDelete, createAlbum, addAlbumUser, getAllPhotoOfAnAlbum} from './album.controller';
import dtoValidation from '../middleware/validate';
import { checkJwt } from '../middleware/decodeJwt';
import { AlbumDto } from './album.repository';

const router = Router();

router.get('/albums', checkJwt, albumList);

router.get('/album/:id', checkJwt, albumId);

router.post('/album', checkJwt, dtoValidation(AlbumDto), createAlbum)

router.put('/user/:userId/album/:albumId', checkJwt, addAlbumUser)

router.get('/all_photo_album/:id', checkJwt, getAllPhotoOfAnAlbum)

router.patch('/album/:id', checkJwt, dtoValidation(AlbumDto), albumUpdate),
  
router.delete('/album/:id', checkJwt, albumDelete);

export default router;
