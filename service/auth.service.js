const User = require('../model/User')
const { compareSenha } = require('../utils/bcrypt')
const { gerarToken } = require('../utils/jwt')

async function login(email, senha) {

    console.log(email, senha);
    

    if (!email || !senha) {
        throw new Error('E-mail e senha são obrigatórios')
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
        throw new Error('Usuário não encontrado')
    }

    const senhaValida = await compareSenha(senha, user.password)

    if (!senhaValida) {
        throw new Error('Senha inválida')
    }

    const token = gerarToken({
        id: user.id,
        email: user.email,
        access_level: user.access_level
    })

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            access_level: user.access_level,
            coin_points: user.coin_points
        }
    }
}

module.exports = { login }