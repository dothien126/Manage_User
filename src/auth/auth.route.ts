import {Router} from 'express'

import { register, login, changePassword } from './auth.controller'
import dtoValidation from '../middleware/validate'
import { UserRegisterDto, UserLoginDto, UserChangePasswordDto } from './auth.repository'

const router = Router()

router.post('/login', dtoValidation(UserLoginDto), login)

router.post('/register', dtoValidation(UserRegisterDto), register)

router.post('/change-password/:id', dtoValidation(UserChangePasswordDto) , changePassword)

export default router

