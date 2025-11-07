import { validationResult } from "express-validator"
import { User } from "../models/user.js"
import jwt from "jsonwebtoken"

export const register =  async(req,res)=> {
        const {email,password} = req.body
    try {
        let user = await User.findOne({email})
        if (user) throw {code: 11000}
        
        user = new User({email,password})
        await user.save()

        //JWT = Jason Web Token
        return res.json({ok:true})
    
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

        let user = await User.findOne({email})
        if (!user) return res.status(403).json({error: "No existe este usuario"})
        
        const respuestaPassword = await user.comparePassword(password)
        if(!respuestaPassword){
            return res.status(403).json({error: "Credencial Incorrecto"})
        }
// --- Generar JWT

const token = jwt.sign({uid: user._id},process.env.JWT_SECRET)
            return res.json({token})
    
    } catch (error) {
        console.log(error.code)
        return res.status(500).json({error: "Error de servidor"})
    }    
}

