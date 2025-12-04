const {
    createCategory,
    listCategories,
    updateCategory,
    deleteCategory,
    searchCategories
} = require('../service/category.service')

async function create(req, res) {
    try {
        const category = await createCategory(req.body)

        return res.status(201).json({
            message: 'Categoria criada com sucesso',
            category
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const categories = await listCategories()
        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updateCategory(id, req.body)

        return res.status(200).json({
            message: 'Categoria atualizada com sucesso',
            category: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const { id } = req.params
        await deleteCategory(id)

        return res.status(200).json({
            message: 'Categoria apagada com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const categories = await searchCategories(searchTerm)
        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    create,
    list,
    update,
    delet,
    search
}
