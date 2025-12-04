const {
    createUser,
    createAdmin,
    searchUsers,
    listUsers,
    updateUser,
    updateCoin,
    deleteUser
} = require('../service/user.service')

async function create(req, res) {
    try {
        const user = await createUser(req.body)

        return res.status(201).json({
            message: 'usuário criado com sucesso',
            ...user
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function creatAdmin(req, res) {
    try {
        const admin = await createAdmin(req.body)

        return res.status(201).json({
            message: 'administrador criado com sucesso',
            ...admin
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s
    
    try {
        const users = await searchUsers(searchTerm)
        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function list(req, res) {
    try {
        const users = await listUsers()

        return res.status(200).json(users)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function update(req, res) {
    const { id } = req.params
    const ownId = req.query.own
    const dados = req.body

    try {
        const userUpdate = await updateUser(id, ownId, dados)

        return res.status(200).json({
            message: 'produto atualizado com sucesso',
            user: userUpdate
        })


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function updatCoin(req, res) {
    const { id } = req.params
    const coin = req.body.coin

    try {
        const coinUpdate = await updateCoin(id, coin)

        return res.status(200).json({
            message: 'Contagem de pontos atualizadas atualizado com sucesso',
            coin: coinUpdate
        })


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function delet(req, res) {
    const { id } = req.params
    const ownId = req.query.own


    try {
        await deleteUser(id, ownId)

        return res.status(200).json({
            message: 'produto apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    create,
    creatAdmin,
    search,
    list,
    update,
    updatCoin,
    delet
}