const Sale = require('../model/Sale')

async function createSale(dados) {

    const { user_id, freight, subtotal } = dados

    if (!user_id || !freight || !subtotal) {
        throw new Error('Dados incompletos para registrar a compra')
    }

    const total = subtotal + freight
    const status = 'PENDING'

    const newSale = await Sale.create({
        user_id,
        status,
        freight,
        subtotal,
        total
    })

    return newSale
}

async function listSales() {
    return await Sale.findAll()
}

async function listSalesUser(id) {
    return await Sale.findAll({
        where: { id }
    })
}

async function updateSale(id, status) {
    const sale = await Sale.findByPk(id)

    if(!sale) {
        throw new Error('Compra não encontrada')
    }

    await sale.update(status)

    return sale
}

module.exports = {
    createSale,
    listSales,
    listSalesUser,
    updateSale
}