import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import { User } from "../models/user.js"
import { generateToken, generateRefreshToken } from "../utils/generateToken.js"


export const register =  async(req,res)=> {
    const {email,password} = req.body
    
    try {
        let user = await User.findOne({email})
            if (user) throw {code: 11000}
        
        user = new User({email,password})
        await user.save()

        //JWT = Jason Web Token
        const {token,expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        return res.status(201).json({token,expiresIn})
    
    } catch (error) {
        console.log(error.code)
        if (error.code === 11000) {
            return res.status(400).json({error: "Ya existe este usuario"})
        }
        return res.status(500).json({error: "Error de servidor"})
    }    
}

export const login = async (req,res)=> {
    try {
        const {email,password} = req.body

        let user = await User.findOne({ email })
            if (!user) 
            return res.status(403).json({ error: "Credenciales incorrectas" })

        const respuestaPassword = await user.comparePassword(password)
            if (!respuestaPassword) {
            return res.status(403).json({ error: "Credenciales incorrectas" })
        }
// --- Generar JWT --- //
const { token, expiresIn } = generateToken(user.id);
generateRefreshToken(user.id, res)


return res.json({ token, expiresIn });

} catch (error) {
        console.log(error.code)
        return res.status(500).json({error: "Error de servidor"})
    }    
}

export const infoUser = async(req,res) => {
    try {
      const user = await User.findById(req.uid).lean()
        return res.json({email: user.email})
    }catch(error) {
return res.status
    }
}

export const refreshToken = (req,res) => {
    try {
     const { uid } = req;    
     const {token,expiresIn} = generateToken(uid)
        return res.json({token,expiresIn})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"error de servidor"})
        }    
    }

export const logOut = (req,res) => {
    res.clearCookie('token', {
        httmOnly: true,
        secure: !(process.env.MODO === "developer"),

    },
    res.clearCookie('refreshToken')
)
    res.json({ok:true})
}

