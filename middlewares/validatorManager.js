import { validationResult, body,param } from "express-validator";
import axios from "axios";

export const validationResultExpress = (req,res,next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}

export const bodyRegisterValidator = [
body('email')
    .trim()
    .isEmail().withMessage("Formato Incorrecto")
    .normalizeEmail(),

    body("password")
    .trim()
    .notEmpty().withMessage("La contraseña no puede estar vacia")
    .isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres")
    .custom(
        (value,{req}) => {
            if (value !== req.body.repassword) {
                throw new Error("Las contraseñas no coinciden")
            }
            return value
        }
    ),
    validationResultExpress    
]

export const bodyLoginValidator = [
body('email')
.trim()
.isEmail().withMessage("Formato Incorrecto")
.normalizeEmail(),

body("password")
.trim()
.notEmpty().withMessage("La contraseña no puede estar vacia")
.isLength({min:6}).withMessage("La contraseña debe tener al menos 6 caracteres"),    
validationResultExpress
]

export const bodyLinkValidator = [
    body('longLink', 'Formato incorrecto')
    .trim()
    .notEmpty()   
    .isURL()
    .custom(async value=> {
        try {

            if (!value.startsWith('https://')) {
                value = 'https://' + value
            }
            console.log(value)
            await axios.get(value, { maxRedirects: 5, timeout: 5000 })
            return value

        } catch (error) {
            console.log(error)
            throw new Error("no found longLink 404")
        }
    }),
    validationResultExpress,
]

export const paramLinkValidator = [
    param('id', 'formato no valido(exprs validator')
    .trim()
    .notEmpty()
    .escape(),
    validationResultExpress,
]