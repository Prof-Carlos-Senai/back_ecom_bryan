const {
    createCartItem,
    listUserCartItems,
    updateCartItemQuantity,
    deleteCartItem,
    listAllCartItems
} = require('../service/Cart_item.service')

// USUÁRIO
async function create(req, res) {
    try {
        const user_id = req.user.id
        const item = await createCartItem(user_id, req.body)

        return res.status(201).json({
            message: 'Item adicionado ao carrinho com sucesso',
            item
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function listOwn(req, res) {
    try {
        const user_id = req.user.id
        const items = await listUserCartItems(user_id)

        return res.status(200).json(items)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function updateQuantity(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params
        const { quantity } = req.body
        const updated = await updateCartItemQuantity(user_id, id, quantity)

        return res.status(200).json({
            message: 'Quantidade atualizada com sucesso',
            item: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const user_id = req.user.id
        const { id } = req.params
        await deleteCartItem(user_id, id)

        return res.status(200).json({
            message: 'Item removido do carrinho com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// ADMIN
async function listAll(req, res) {
    try {
        const items = await listAllCartItems()
        return res.status(200).json(items)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    listOwn,
    updateQuantity,
    delet,
    listAll
}
