const {
    createSale,
    listSales,
    listSalesUser,
    updateSale
} = require('../service/sale.service')

const { createSale_item } = require('../service/sale_item.service')

async function create(req, res) {
    try {
        const sale = await createSale(req.body)

        const sale_items = await createSale_item(req.body, sale.id)

        return res.status(201).json({
            message: 'compra realizada com sucesso',
            sale,
            sale_items
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function list(req, res) {
    try {
        const sales = await listSales()

        return res.status(200).json(sales)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function listUser(req, res) {
    const { id } = req.params
    
    try {
        const sales = await listSalesUser(id)

        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function update(req, res) {
    const { id } = req.params
    const status = req.body.status

    try {
        const saleUpdate = await updateSale(id, status)

        return res.status(200).json({
            message: 'produto atualizado com sucesso',
            sale: saleUpdate
        })


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    create,
    list,
    listUser,
    update
}