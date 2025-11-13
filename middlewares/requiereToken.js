import jwt from 'jsonwebtoken'

export const requiereToken = (req,res,next) => {
  try {
    const token = req.cookies?.refreshToken
    console.log( "token recibido ")
      if(!token){
        throw new Error("No existe, Usar Bearer")
      } 
      const {uid}= jwt.verify(token, process.env.JWT_REFRESH)
      req.uid=uid
    next()
    } catch (error) {
        console.log(error.message)

    const TokenVerificationErrors = {
      ["invalid signature"]: "la firma del JWT no es valida",
      ["jwt expired"]: "JWT expirado",
      ["invalid token"]: "Token no valido",
      ["No Bearer"]: "Utilza formato Bearer",
      ["jwt malformed"]: "JWT formato invalido"
}

return res.status(401).send({error: TokenVerificationErrors [error.message]})
    }
}