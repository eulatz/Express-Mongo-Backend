import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {
const expiresIn = 60 *15
    try {

        const token = jwt.sign({uid}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}
    } catch (error) {
        console.log(error)
    }
}

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30; // 30 días
    try {
        const refreshToken = jwt.sign({uid}, process.env.JWT_REFRESH, {expiresIn,});

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO ==="developer"),
            expires: new Date(Date.now() + expiresIn * 1000),
        });

        console.log("Token enviado en cookie");
    } catch (error) {
        console.log(error);
    }
}

    export const tokenVerificationErrors = {
      ["invalid signature"]: "la firma del JWT no es valida",
      ["jwt expired"]: "JWT expirado",
      ["invalid token"]: "Token no valido",
      ["No Bearer"]: "Utilza formato Bearer",
      ["jwt malformed"]: "JWT formato invalido"
}


