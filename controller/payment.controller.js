const {
    createPayment,
    listPayments,
    updatePayment,
    searchPayments,
    listPaymentsAdmin
} = require('../service/payment.service')

// PÚBLICAS
async function create(req, res) {
    try {
        const payment = await createPayment(req.body)

        return res.status(201).json({
            message: 'Pagamento criado com sucesso',
            payment
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const payments = await listPayments()
        return res.status(200).json(payments)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updatePayment(id, req.body)

        return res.status(200).json({
            message: 'Pagamento atualizado com sucesso',
            payment: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

// PRIVADAS (ADMIN)
async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const payments = await searchPayments(searchTerm)
        return res.status(200).json(payments)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function listAdmin(req, res) {
    try {
        const payments = await listPaymentsAdmin()
        return res.status(200).json(payments)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    list,
    update,
    search,
    listAdmin
}
