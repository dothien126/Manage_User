import { Router } from 'express';

import { photoList, photoId, photoUpdate, photoDelete} from './photo.controller';
import dtoValidation from '../middleware/validate';
import { checkJwt } from '../middleware/decodeJwt';
import { PhotoDto } from './photo.repository';

const router = Router();

router.get('/photos', checkJwt, photoList);

router.get('/photo/:id', checkJwt, photoId);

router.post('/photo', checkJwt)

router.patch('/photo/:id', checkJwt, dtoValidation(PhotoDto), photoUpdate),
  
router.delete('/photo/:id', checkJwt);

export default router;
