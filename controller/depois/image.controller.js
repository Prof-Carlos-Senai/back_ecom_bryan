const {
    createImage,
    readImage,
    listImages,
    updateImage,
    deleteImage,
    searchImages
} = require('../service/image.service')

async function create(req, res) {
    try {
        const image = await createImage(req.body)

        return res.status(201).json({
            message: 'Imagem criada com sucesso',
            image
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function read(req, res) {
    try {
        const { id } = req.params
        const image = await readImage(id)

        return res.status(200).json(image)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const images = await listImages()
        return res.status(200).json(images)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updateImage(id, req.body)

        return res.status(200).json({
            message: 'Imagem atualizada com sucesso',
            image: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const { id } = req.params
        await deleteImage(id)

        return res.status(200).json({
            message: 'Imagem apagada com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const images = await searchImages(searchTerm)
        return res.status(200).json(images)
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
