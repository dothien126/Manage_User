import { Router } from 'express';

import { albumList, albumId, albumUpdate, albumDelete} from './album.controller';
import dtoValidation from '../middleware/validate';
import { checkJwt } from '../middleware/decodeJwt';
import { AlbumDto } from './album.repository';

const router = Router();

router.get('/albums', checkJwt, albumList);

router.get('/album/:id', checkJwt, albumId);

router.post('/album', checkJwt)

router.patch('/album/:id', checkJwt, dtoValidation(AlbumDto), albumUpdate),
  
router.delete('/album/:id', checkJwt);

export default router;
