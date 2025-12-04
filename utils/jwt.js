require('dotenv').config()

const jwt = require('jsonwebtoken')
const SEGREDO = process.env.JWT_SECRET
const EXPIRE = process.env.JWT_EXPIRES_IN

function gerarToken(payload){
    return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRE})
}

function verificarToken(token){
    try{
        return jwt.verify(token,SEGREDO)
    }catch(err){
        console.error('Erro ao verificar o token')
        return null
    }
}

module.exports = { gerarToken, verificarToken }
