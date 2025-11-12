import jwt from 'jsonwebtoken'

export const requiereToken = (req,res,next) => {
    try {
        let token = req.headers?.authorization
        if(!token) throw new Error("No existe, Usar Bearer")

    token = token.split(" ")[1]
        
    const {uid}= jwt.verify(token, process.env.JWT_SECRET)
        //console.log(payload)
        req.uid = uid
            //console.log(req.headers)
next()
    } catch (error) {
const TokenVerificationErrors = {
    "invalid signature" : "la firma del JWT no es valida",
    ["jwt wxpired"]: "JWT expirado",
    ["invalid token"]: "Token no valido",
    ["No bearer"]: "Utilza formato Bearer",
} 
return res.status(401).send({error: TokenVerificationErrors [error.message]})
    }
}