const {
    createStockRecord,
    listStockRecords
} = require('../service/stock.service')

async function create(req, res) {
    try {
        const stock = await createStockRecord(req.body)

        return res.status(201).json({
            message: 'Registro de estoque criado com sucesso',
            stock
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const stocks = await listStockRecords()
        return res.status(200).json(stocks)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    list
}
