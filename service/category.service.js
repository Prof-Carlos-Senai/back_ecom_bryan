const Category = require('../model/Category')
const { Op } = require('sequelize')
const { gerarSlug } = require('../utils/function')

// ADMIN
async function createCategory(dados) {
    
    const { name, description } = dados

    if (!name) {
        throw new Error('Nome da categoria é obrigatório')
    }

    const slug = gerarSlug(name)

    const existing = await Category.findOne({ where: { slug } })
    if (existing) {
        throw new Error('Categoria com esse slug já existe')
    }

    const newCategory = await Category.create({
        name,
        description,
        slug,
        is_active: true
    })

    return newCategory
}

async function listCategories() {
    const categories = await Category.findAll()
    return categories
}

async function updateCategory(id, dados) {
    const category = await Category.findByPk(id)
    if (!category) {
        throw new Error('Categoria não encontrada')
    }

    // Se alterar nome, atualiza slug
    if (dados.name) {
        dados.slug = gerarSlug(dados.name)
    }

    await category.update(dados)
    return category
}

async function deleteCategory(id) {
    const category = await Category.findByPk(id)
    if (!category) {
        throw new Error('Categoria não encontrada')
    }

    await category.destroy()

    return { status: true, message: 'Categoria apagada com sucesso!' }
}

async function searchCategories(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const categories = await Category.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { slug: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return categories
}

module.exports = {
    createCategory,
    listCategories,
    updateCategory,
    deleteCategory,
    searchCategories
}
