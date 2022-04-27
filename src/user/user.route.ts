import {Router} from 'express'

import { userList, userId, userUpdate, userDelete } from './user.controller'
import dtoValidationMiddleware from '../middleware/validate'
import { UserDto } from './user.repository'

const router = Router()

router.get('/users', userList)

router.get('/users/:id', userId)

router.patch('/users/:id', dtoValidationMiddleware(UserDto), userUpdate),

router.delete('users/:id', userDelete)

export default router