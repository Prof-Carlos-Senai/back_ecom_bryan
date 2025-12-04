const {
    createProduct,
    searchProducts,
    listProducts,
    listProductsAdmin,
    updateProduct,
    deleteProduct
} = require('../service/product.service')

async function create(req, res) {
    try {
        const product = await createProduct(req.body)

        return res.status(201).json({
            message: 'produto criado com sucesso',
            product
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s
    
    try {
        const products = await searchProducts(searchTerm)
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function list(req, res) {
    try {
        const products = await listProducts()

        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function listAdmin(req, res) {
    try {
        const products = await listProductsAdmin()

        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function update(req, res) {
    const { id } = req.params
    const dados = req.body

    try {
        const productUpdate = await updateProduct(id, dados)

        return res.status(200).json({
            message: 'produto atualizado com sucesso',
            product: productUpdate
        })


    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

async function delet(req, res) {
    const { id } = req.params

    try {
        await deleteProduct(id)

        return res.status(200).json({
            message: 'produto apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}

module.exports = {
    create,
    search,
    list,
    listAdmin,
    update,
    delet
}