const Sale_item = require('../model/Sale_item')

async function createSale_item(dados, sale_id) {
    const { items } = dados

    for(const item of items) {
        if (!item.product_id || !item.quantity || !item.price) {
            throw new Error('Dados incompletos para registrar o item')
        }
    }

    const newItems = []

    for(const item of items) {
        const subtotal = item.quantity * item.price
    
        const newSale_item = await Sale_item.create({
            sale_id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
            subtotal
        })

        newItems.push(newSale_item)
    }    

    return newItems
}

module.exports = { 
    createSale_item
}