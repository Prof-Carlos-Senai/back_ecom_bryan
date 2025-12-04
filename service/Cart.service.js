const Cart = require('../model/Cart')
const Cart_item = require('../model/Cart_item')
const { Op } = require('sequelize')

// USUÁRIO
async function createCart(user_id) {
    // Só cria se o usuário não tiver um carrinho
    const existing = await Cart.findOne({ where: { user_id } })
    if (existing) {
        throw new Error('Usuário já possui um carrinho')
    }

    const newCart = await Cart.create({ user_id, total_price: 0.00 })
    return newCart
}

async function readUserCart(user_id) {
    const cart = await Cart.findOne({ where: { user_id } })
    if (!cart) {
        throw new Error('Carrinho não encontrado')
    }

    const items = await Cart_item.findAll({ where: { cart_id: cart.id } })

    return { cart, items }
}

async function updateCartTotal(user_id, cart_id) {
    const cart = await Cart.findByPk(cart_id)
    if (!cart) {
        throw new Error('Carrinho não encontrado')
    }

    if (cart.user_id !== user_id) {
        throw new Error('Você não tem permissão para atualizar este carrinho')
    }

    const items = await Cart_item.findAll({ where: { cart_id: cart.id } })
    const total = items.reduce((acc, it) => acc + Number(it.subtotal), 0)

    await cart.update({ total_price: total })

    return cart
}

// ADMIN
async function listCartsAdmin() {
    const carts = await Cart.findAll()
    return carts
}

async function searchCarts(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const carts = await Cart.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { user_id: { [Op.like]: `${search}` } }
            ]
        }
    })

    return carts
}

module.exports = {
    createCart,
    readUserCart,
    updateCartTotal,
    listCartsAdmin,
    searchCarts
}
