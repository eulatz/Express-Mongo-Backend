import { Router } from 'express'
import { body } from 'express-validator'

import { infoUser, login, register,refreshToken, logOut } from '../controllers/auth.controller.js'

import { validationResultExpress,bodyRegisterValidator, bodyLoginValidator } from '../middlewares/validatorManager.js'
import { requiereRefreshToken } from '../middlewares/requiereRefreshToken.js'
import { requiereToken } from '../middlewares/requiereToken.js'

import { generateRefreshToken } from '../utils/generateToken.js'

const router = Router()

router.post('/login' , bodyLoginValidator ,login)
router.post('/register', bodyRegisterValidator ,register)
router.get('/protected',requiereToken, infoUser)
router.get("/refresh",requiereRefreshToken, refreshToken)
router.get('/logout',logOut)

export default router;