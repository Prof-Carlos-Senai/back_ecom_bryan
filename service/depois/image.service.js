const Image = require('../model/Image')
const Product = require('../model/Product')
const { Op } = require('sequelize')

// ADMIN
async function createImage(dados) {
    const { product_id, url, alt_text, is_primary } = dados

    if (!product_id || !url) {
        throw new Error('Dados incompletos para criar a imagem')
    }

    // Verifica produto existe
    const product = await Product.findByPk(product_id)
    if (!product) {
        throw new Error('Produto não encontrado para associar a imagem')
    }

    // Se for a imagem principal e já houver outra principal, atualiza a anterior
    if (is_primary) {
        await Image.update({ is_primary: false }, { where: { product_id } })
    }

    const newImage = await Image.create({ product_id, url, alt_text, is_primary: !!is_primary })
    return newImage
}

async function readImage(id) {
    const image = await Image.findByPk(id)
    if (!image) {
        throw new Error('Imagem não encontrada')
    }

    return image
}

async function listImages() {
    const images = await Image.findAll()
    return images
}

async function updateImage(id, dados) {
    const image = await Image.findByPk(id)
    if (!image) {
        throw new Error('Imagem não encontrada')
    }

    if (dados.is_primary) {
        await Image.update({ is_primary: false }, { where: { product_id: image.product_id } })
    }

    await image.update(dados)
    return image
}

async function deleteImage(id) {
    const image = await Image.findByPk(id)
    if (!image) {
        throw new Error('Imagem não encontrada')
    }

    await image.destroy()
    return { status: true, message: 'Imagem apagada com sucesso!' }
}

async function searchImages(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const images = await Image.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { url: { [Op.like]: `%${search}%` } },
                { alt_text: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return images
}

module.exports = {
    createImage,
    readImage,
    listImages,
    updateImage,
    deleteImage,
    searchImages
}
