const Cart_item = require('../model/Cart_item')
const Cart = require('../model/Cart')
const Product = require('../model/Product')
const { Op } = require('sequelize')

// USUÁRIO
async function createCartItem(user_id, dados) {
    const { product_id, quantity } = dados

    if (!product_id || !quantity || quantity <= 0) {
        throw new Error('Dados incompletos ou inválidos para adicionar ao carrinho')
    }

    // Verifica se o usuário tem um carrinho
    const cart = await Cart.findOne({ where: { user_id } })
    if (!cart) {
        throw new Error('Carrinho não encontrado para este usuário')
    }

    // Pega preço do produto
    const product = await Product.findByPk(product_id)
    if (!product) {
        throw new Error('Produto não encontrado')
    }

    const price = product.price
    const subtotal = Number(price) * Number(quantity)

    // Se já existe item do mesmo produto no carrinho, atualiza a quantidade
    let cartItem = await Cart_item.findOne({ where: { cart_id: cart.id, product_id } })

    if (cartItem) {
        const newQuantity = Number(cartItem.quantity) + Number(quantity)
        const newSubtotal = Number(price) * newQuantity
        await cartItem.update({ quantity: newQuantity, price, subtotal: newSubtotal })
        return cartItem
    }

    const newCartItem = await Cart_item.create({
        cart_id: cart.id,
        product_id,
        quantity,
        price,
        subtotal
    })

    return newCartItem
}

async function listUserCartItems(user_id) {
    const cart = await Cart.findOne({ where: { user_id } })
    if (!cart) {
        throw new Error('Carrinho não encontrado para este usuário')
    }

    const items = await Cart_item.findAll({ where: { cart_id: cart.id } })

    return items
}

async function updateCartItemQuantity(user_id, cart_item_id, quantity) {
    if (!quantity || quantity <= 0) {
        throw new Error('Quantidade inválida')
    }

    const cartItem = await Cart_item.findByPk(cart_item_id)
    if (!cartItem) {
        throw new Error('Item do carrinho não encontrado')
    }

    const cart = await Cart.findByPk(cartItem.cart_id)
    if (!cart || cart.user_id !== user_id) {
        throw new Error('Você não tem permissão para atualizar este item')
    }

    // Atualiza subtotal com base no preço atual salvo no item
    const newSubtotal = Number(cartItem.price) * Number(quantity)
    await cartItem.update({ quantity, subtotal: newSubtotal })

    return cartItem
}

async function deleteCartItem(user_id, cart_item_id) {
    const cartItem = await Cart_item.findByPk(cart_item_id)
    if (!cartItem) {
        throw new Error('Item do carrinho não encontrado')
    }

    const cart = await Cart.findByPk(cartItem.cart_id)
    if (!cart || cart.user_id !== user_id) {
        throw new Error('Você não tem permissão para apagar este item')
    }

    await cartItem.destroy()

    return { status: true, message: 'Item removido do carrinho com sucesso!' }
}

// ADMIN
async function listAllCartItems() {
    const items = await Cart_item.findAll()
    return items
}

module.exports = {
    // Usuário
    createCartItem,
    listUserCartItems,
    updateCartItemQuantity,
    deleteCartItem,
    // Admin
    listAllCartItems
}
