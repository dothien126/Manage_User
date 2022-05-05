import {Router} from 'express'

import { userList, userId, userUpdate, userDelete, getAllAlbumOfAnUser } from './user.controller'
import dtoValidation from '../middleware/validate'
import { UserDto } from './user.repository'
import {checkJwt} from '../middleware/decodeJwt'

const router = Router()

router.get('/users', checkJwt, userList)

router.get('/users/:id', checkJwt, userId)

router.patch('/users/:id', checkJwt, dtoValidation(UserDto), userUpdate),

router.delete('/users/:id', checkJwt, userDelete)

router.get('/all_album_user/:id', checkJwt, getAllAlbumOfAnUser)

export default router