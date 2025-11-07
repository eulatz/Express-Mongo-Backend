import {Router} from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { body } from 'express-validator'
import { validationResultExpress } from '../middlewares/validatorResultExpress.js'

const router = Router()

router.post('/login' , [
body('email')
    .trim()
    .isEmail().withMessage("Formato Incorrecto")
    .normalizeEmail(),

    body("password")
    .trim()
    .notEmpty().withMessage("La contraseña no puede estar vacia")
    .isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres")    
],validationResultExpress,login)


router.post('/register', [
    body('email')
    .trim()
    .isEmail().withMessage("Formato Incorrecto")
    .normalizeEmail(),

    body("password")
    .trim()
    .notEmpty().withMessage("La contraseña no puede estar vacia")
    .isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres")
    .custom((value,{req}) => {
        if(value !== req.body.repassword){
            throw new Error("Las contraseñas no coinciden")
        }
        return value;
    }),
],validationResultExpress,register)

export default router;