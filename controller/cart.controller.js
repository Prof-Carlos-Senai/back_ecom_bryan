const {
    createCart,
    readUserCart,
    updateCartTotal,
    listCartsAdmin,
    searchCarts
} = require('../service/Cart.service')

// USUÁRIO
async function create(req, res) {
    try {
        const user_id = req.user.id
        const cart = await createCart(user_id)

        return res.status(201).json({
            message: 'Carrinho criado com sucesso',
            cart
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function readOwn(req, res) {
    try {
        const user_id = req.user.id
        const data = await readUserCart(user_id)

        return res.status(200).json(data)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function updateTotal(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params
        const updated = await updateCartTotal(user_id, id)

        return res.status(200).json({
            message: 'Total do carrinho atualizado com sucesso',
            cart: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// ADMIN
async function listAll(req, res) {
    try {
        const carts = await listCartsAdmin()
        return res.status(200).json(carts)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const carts = await searchCarts(searchTerm)
        return res.status(200).json(carts)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    readOwn,
    updateTotal,
    listAll,
    search
}
