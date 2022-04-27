import {Router} from 'express'

import { userList, userId, userUpdate, userDelete } from './user.controller'

const router = Router()

router.get('/users', userList)

router.get('/users/:id', userId)

router.patch('/users/:id', userUpdate),

router.delete('users/:id', userDelete)

export default router