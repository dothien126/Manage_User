import {Router} from 'express'

import { register, login, changePassword } from './auth.controller'

const router = Router()

router.post('/login', login)

router.post('/register', register)

router.post('/change-password', changePassword)

export default router

