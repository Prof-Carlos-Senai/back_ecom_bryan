const {
    createCoupon,
    readCoupon,
    listCoupons,
    updateCoupon,
    deleteCoupon,
    searchCoupons
} = require('../service/coupon.service')

async function create(req, res) {
    try {
        const coupon = await createCoupon(req.body)

        return res.status(201).json({
            message: 'Cupom criado com sucesso',
            coupon
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function read(req, res) {
    try {
        const { id } = req.params
        const coupon = await readCoupon(id)

        return res.status(200).json(coupon)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const coupons = await listCoupons()
        return res.status(200).json(coupons)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updateCoupon(id, req.body)

        return res.status(200).json({
            message: 'Cupom atualizado com sucesso',
            coupon: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const { id } = req.params
        await deleteCoupon(id)

        return res.status(200).json({
            message: 'Cupom apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const coupons = await searchCoupons(searchTerm)
        return res.status(200).json(coupons)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    read,
    list,
    update,
    delet,
    search
}
