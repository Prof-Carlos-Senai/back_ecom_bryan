const Avatar = require('../model/Avatar')
const { Op } = require('sequelize')

// ADMIN
async function createAvatar(dados) {
    const { name, url } = dados

    if (!name || !url) {
        throw new Error('Dados incompletos para criar o avatar')
    }

    const newAvatar = await Avatar.create({
        name,
        url
    })

    return newAvatar
}

async function readAvatar(id) {
    const avatar = await Avatar.findByPk(id)

    if (!avatar) {
        throw new Error('Avatar não encontrado')
    }

    return avatar
}

async function listAvatars() {
    const avatars = await Avatar.findAll()

    return avatars
}

async function updateAvatar(id, dados) {
    const avatar = await Avatar.findByPk(id)

    if (!avatar) {
        throw new Error('Avatar não encontrado')
    }

    await avatar.update(dados)

    return avatar
}

async function deleteAvatar(id) {
    const avatar = await Avatar.findByPk(id)

    if (!avatar) {
        throw new Error('Avatar não encontrado')
    }

    await avatar.destroy()

    return {
        status: true,
        message: 'Avatar apagado com sucesso!'
    }
}

async function searchAvatars(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const avatars = await Avatar.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { name: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return avatars
}

module.exports = {
    createAvatar,
    readAvatar,
    listAvatars,
    updateAvatar,
    deleteAvatar,
    searchAvatars
}
