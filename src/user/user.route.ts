import {Router} from 'express'

import { userList, userId, userUpdate, userDelete } from './user.controller'
import dtoValidation from '../middleware/validate'
import { UserDto } from './user.repository'
import {checkJwt} from '../middleware/decodeJwt'

const router = Router()

router.get('/users', checkJwt, userList)

router.get('/users/:id', checkJwt, userId)

router.patch('/users/:id', checkJwt, dtoValidation(UserDto), userUpdate),

router.delete('/users/:id', checkJwt, userDelete)

export default router