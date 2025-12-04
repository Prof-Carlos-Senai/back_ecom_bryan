const {
    createAddress,
    readUserAddresses,
    updateAddress,
    deleteAddress,
    listAllAddresses,
    searchAddresses
} = require('../service/address.service')

// USUÁRIO
async function create(req, res) {
    try {
        const user_id = req.body.user_id
        const address = await createAddress(user_id, req.body)

        return res.status(201).json({
            message: 'Endereço criado com sucesso',
            address
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function readOwn(req, res) {
    try {
        const user_id = req.query.u
        const addresses = await readUserAddresses(user_id)

        return res.status(200).json(addresses)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const user_id = req.query.own
        const { id } = req.params
        const updated = await updateAddress(user_id, id, req.body)

        return res.status(200).json({
            message: 'Endereço atualizado com sucesso',
            address: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params
        await deleteAddress(user_id, id)

        return res.status(200).json({
            message: 'Endereço apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// ADMIN
async function listAll(req, res) {
    try {
        const addresses = await listAllAddresses()
        return res.status(200).json(addresses)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const addresses = await searchAddresses(searchTerm)
        return res.status(200).json(addresses)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    readOwn,
    update,
    delet,
    listAll,
    search
}
