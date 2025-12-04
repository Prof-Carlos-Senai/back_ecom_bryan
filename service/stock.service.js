const Stock = require('../model/Stock')
const Product = require('../model/Product')
const { Op } = require('sequelize')

// ROTAS PÚBLICAS
async function createStockRecord(dados) {
    const { product_id, quantity, type, date } = dados

    if (!product_id || quantity === undefined || !type) {
        throw new Error('Dados incompletos para registrar o estoque')
    }

    if (quantity < 0) {
        throw new Error('Quantidade não pode ser negativa')
    }

    // Verifica se o produto existe
    const product = await Product.findByPk(product_id)
    if (!product) {
        throw new Error('Produto não encontrado para registrar estoque')
    }

    const newStock = await Stock.create({
        product_id,
        quantity,
        type,
        date: date || new Date()
    })

    return newStock
}

async function listStockRecords() {
    const stocks = await Stock.findAll()
    return stocks
}

module.exports = {
    createStockRecord,
    listStockRecords
}
