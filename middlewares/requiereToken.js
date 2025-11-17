import jwt from 'jsonwebtoken'
import { tokenVerificationErrors } from '../utils/generateToken.js'
export const requiereToken = (req,res,next) => {
  try {
    const token = req.cookies?.refreshToken
    console.log( "token recibido ")
      if(!token){
        throw new Error("No Bearer")
      } 
      const {uid}= jwt.verify(token, process.env.JWT_REFRESH)
      req.uid=uid
    next()
    } catch (error) {
        console.log(error.message)
return res.status(401).send({error: tokenVerificationErrors [error.message]})
    }
}