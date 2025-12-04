const Log = require('../model/Log')
const { Op } = require('sequelize')

// ADMIN
async function createLog(dados) {
    const { user_id, action, description, ip_address } = dados

    if (!action) {
        throw new Error('Ação é obrigatória no log')
    }

    const newLog = await Log.create({ user_id, action, description, ip_address })
    return newLog
}

async function readLog(id) {
    const log = await Log.findByPk(id)
    if (!log) {
        throw new Error('Log não encontrado')
    }

    return log
}

async function listLogs() {
    const logs = await Log.findAll()
    return logs
}

async function updateLog(id, dados) {
    const log = await Log.findByPk(id)
    if (!log) {
        throw new Error('Log não encontrado')
    }

    await log.update(dados)
    return log
}

async function deleteLog(id) {
    const log = await Log.findByPk(id)
    if (!log) {
        throw new Error('Log não encontrado')
    }

    await log.destroy()
    return { status: true, message: 'Log apagado com sucesso!' }
}

async function searchLogs(search) {
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const logs = await Log.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { action: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } },
                { ip_address: { [Op.like]: `%${search}%` } }
            ]
        }
    })

    return logs
}

module.exports = {
    createLog,
    readLog,
    listLogs,
    updateLog,
    deleteLog,
    searchLogs
}
