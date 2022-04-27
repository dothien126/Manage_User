import {Router} from 'express'

import { register, login, changePassword } from './auth.controller'
import dtoValidationMiddleware from '../middleware/validate'
import { UserRegisterDto, UserLoginDto, UserChangePasswordDto } from './auth.repository'

const router = Router()

router.post('/login', dtoValidationMiddleware(UserLoginDto), login)

router.post('/register', dtoValidationMiddleware(UserRegisterDto), register)

router.post('/change-password',dtoValidationMiddleware(UserChangePasswordDto) , changePassword)

export default router

