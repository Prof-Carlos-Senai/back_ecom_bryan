require('dotenv').config()

const jwt = require('jsonwebtoken')
const SEGREDO = process.env.JWT_SECRET
const EXPIRE = process.env.JWT_EXPIRES_IN

// LOGS IMPORTANTES
console.log("JWT_SECRET carregado:", SEGREDO)
console.log("JWT_EXPIRES_IN carregado:", EXPIRE)

function gerarToken(payload){
    console.log("Gerando token com payload:", payload)
    console.log("Usando segredo:", SEGREDO)
    return jwt.sign(payload, SEGREDO, { expiresIn: EXPIRE})
}

function verificarToken(token){
    console.log("Token recebido para verificação:", token)
    console.log("Segredo usado na verificação:", SEGREDO)
    try{
        return jwt.verify(token,SEGREDO)
    }catch(err){
        console.error('Erro ao verificar o token')
        return null
    }
}

module.exports = { gerarToken, verificarToken }
