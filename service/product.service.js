const Product = require('../model/Product')
const { Op } = require('sequelize')
const { gerarSlug } = require('../utils/function')

async function createProduct(dados) {

    const { name, description, price, blocks, age_min, avaliation, stock, category_id, image_url } = dados

    if (!name || !price || !blocks || !age_min || !stock || !category_id || !image_url) {
        throw new Error('Dados incompletos para criar o produto')
    }

    const slug = gerarSlug(name)
    const status = true

    const newProduct = await Product.create({
        name,
        description,
        price,
        status,
        slug,
        blocks,
        age_min,
        avaliation,
        stock,
        category_id,
        image_url
    })

    return newProduct
}

async function searchProducts(search) {
    // Essa rota vai buscar os produtos com base no nome e descrição
    
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const products = await Product.findAll({
        where: {
            status: true,
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return products

}

async function listProducts() {
    const products = await Product.findAll({
        where: {
            status: true
        }
    })

    return products
}

async function listProductsAdmin() {
    const products = await Product.findAll()

    return products
}

async function updateProduct(id, dados) {

    const product = await Product.findByPk(id)

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    await product.update(dados)

    return product
}

async function deleteProduct(id) {
    
    const product = await Product.findByPk(id)

    if (!product) {
        throw new Error('Produto não encontrado')
    }

    await product.destroy()

    return {
        status: true,
        message: 'Dados Apagados com Sucesso!'
    }
}

module.exports = {
    createProduct,
    searchProducts,
    listProducts,
    listProductsAdmin,
    updateProduct,
    deleteProduct
}