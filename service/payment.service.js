const Payment = require('../model/Payment')
const Sale = require('../model/Sale')
const { Op } = require('sequelize')

// ROTAS PÚBLICAS
async function createPayment(dados) {
    const { sale_id, method, amount, transaction_id } = dados

    if (!sale_id || !method || !amount) {
        throw new Error('Dados incompletos para criar o pagamento')
    }

    // Verifica se a venda existe
    const sale = await Sale.findByPk(sale_id)
    if (!sale) {
        throw new Error('Venda não encontrada para associar ao pagamento')
    }

    const newPayment = await Payment.create({
        sale_id,
        method,
        amount,
        transaction_id,
        status: 'pending' // Status inicial sempre pendente
    })

    return newPayment
}

async function listPayments() {
    const payments = await Payment.findAll()
    return payments
}

async function updatePayment(id, dados) {
    const payment = await Payment.findByPk(id)
    if (!payment) {
        throw new Error('Pagamento não encontrado')
    }

    // Se status não é pendente, só permite atualizar status
    if (payment.status !== 'pending') {
        if (!dados.status || Object.keys(dados).length > 1) {
            throw new Error('Pagamento já foi processado. Apenas o status pode ser atualizado.')
        }
        await payment.update({ status: dados.status })
        return payment
    }

    // Se status é pendente, permite atualizar todos os dados
    const updatedData = {
        method: dados.method || payment.method,
        amount: dados.amount || payment.amount,
        transaction_id: dados.transaction_id || payment.transaction_id
    }

    // Se houver novo status, atualiza também
    if (dados.status) {
        updatedData.status = dados.status
        // Se mudar para completed, registra data de pagamento
        if (dados.status === 'completed') {
            updatedData.paid_at = new Date()
        }
    }

    await payment.update(updatedData)
    return payment
}

// ROTAS PRIVADAS (ADMIN)
async function searchPayments(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const payments = await Payment.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { sale_id: { [Op.like]: `${search}` } },
                { transaction_id: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return payments
}

async function listPaymentsAdmin() {
    const payments = await Payment.findAll()
    return payments
}

module.exports = {
    // Públicas
    createPayment,
    listPayments,
    updatePayment,
    // Privadas (Admin)
    searchPayments,
    listPaymentsAdmin
}
