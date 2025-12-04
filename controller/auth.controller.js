const authService = require('../service/auth.service')

async function login(req, res) {
    try {
        const { email, password } = req.body

        const resultado = await authService.login(email, password)

        return res.status(200).json({
            message: "login realizado com sucesso",
            ...resultado
        })

    } catch (err) {
        return res.status(500).json({
            mensagem: err.message || 'Erro ao realizar login'
        })
    }
}

module.exports = { login }