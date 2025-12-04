const {
    createAvatar,
    readAvatar,
    listAvatars,
    updateAvatar,
    deleteAvatar,
    searchAvatars
} = require('../service/avatar.service')

async function create(req, res) {
    try {
        const avatar = await createAvatar(req.body)

        return res.status(201).json({
            message: 'Avatar criado com sucesso',
            avatar
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function read(req, res) {
    try {
        const { id } = req.params
        const avatar = await readAvatar(id)

        return res.status(200).json(avatar)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const avatars = await listAvatars()
        return res.status(200).json(avatars)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updateAvatar(id, req.body)

        return res.status(200).json({
            message: 'Avatar atualizado com sucesso',
            avatar: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const { id } = req.params
        await deleteAvatar(id)

        return res.status(200).json({
            message: 'Avatar apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const avatars = await searchAvatars(searchTerm)
        return res.status(200).json(avatars)
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
