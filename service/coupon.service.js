const Coupon = require('../model/Coupon')
const { Op } = require('sequelize')

// ADMIN
async function createCoupon(dados) {
    const { name, code, discount, expiration_date } = dados

    if (!name || !code || !discount || !expiration_date) {
        throw new Error('Dados incompletos para criar o cupom')
    }

    // Verifica duplicidade por nome ou código
    const exists = await Coupon.findOne({ where: { [Op.or]: [{ name }, { code }] } })
    if (exists) {
        throw new Error('Cupom com mesmo nome ou código já existe')
    }

    const newCoupon = await Coupon.create({ name, code, discount, expiration_date })
    return newCoupon
}

async function readCoupon(id) {
    const coupon = await Coupon.findByPk(id)
    if (!coupon) {
        throw new Error('Cupom não encontrado')
    }

    return coupon
}

async function listCoupons() {
    const coupons = await Coupon.findAll()
    return coupons
}

async function updateCoupon(id, dados) {
    const coupon = await Coupon.findByPk(id)
    if (!coupon) {
        throw new Error('Cupom não encontrado')
    }

    // Evita duplicar name/code ao atualizar
    if (dados.name || dados.code) {
        const where = { [Op.or]: [] }
        if (dados.name) where[Op.or].push({ name: dados.name })
        if (dados.code) where[Op.or].push({ code: dados.code })
        const exists = await Coupon.findOne({ where })
        if (exists && exists.id !== coupon.id) {
            throw new Error('Outro cupom com mesmo nome ou código já existe')
        }
    }

    await coupon.update(dados)
    return coupon
}

async function deleteCoupon(id) {
    const coupon = await Coupon.findByPk(id)
    if (!coupon) {
        throw new Error('Cupom não encontrado')
    }

    await coupon.destroy()
    return { status: true, message: 'Cupom apagado com sucesso!' }
}

async function searchCoupons(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const coupons = await Coupon.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { name: { [Op.like]: `%${search}%` } },
                { code: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return coupons
}

module.exports = {
    createCoupon,
    readCoupon,
    listCoupons,
    updateCoupon,
    deleteCoupon,
    searchCoupons
}
