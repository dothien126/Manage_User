import { Router } from 'express';

import { addPhoto, photoList, photoId, photoUpdate, photoDelete} from './photo.controller';
import dtoValidation from '../middleware/validate';
import { checkJwt } from '../middleware/decodeJwt';
import { PhotoDto } from './photo.repository';
import uploadSingle from '../utils/uploadFile'
import { create } from 'domain';

const router = Router();

router.get('/photos', checkJwt, photoList);

router.get('/photo/:id', checkJwt, photoId);

router.post('/photo', checkJwt, uploadSingle, addPhoto)

router.patch('/photo/:id', checkJwt, dtoValidation(PhotoDto), photoUpdate),
  
router.delete('/photo/:id', checkJwt, photoDelete);

export default router;
