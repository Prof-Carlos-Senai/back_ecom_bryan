const {
    createLog,
    readLog,
    listLogs,
    updateLog,
    deleteLog,
    searchLogs
} = require('../service/log.service')

async function create(req, res) {
    try {
        const log = await createLog(req.body)

        return res.status(201).json({
            message: 'Log criado com sucesso',
            log
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function read(req, res) {
    try {
        const { id } = req.params
        const log = await readLog(id)

        return res.status(200).json(log)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function list(req, res) {
    try {
        const logs = await listLogs()
        return res.status(200).json(logs)
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function update(req, res) {
    try {
        const { id } = req.params
        const updated = await updateLog(id, req.body)

        return res.status(200).json({
            message: 'Log atualizado com sucesso',
            log: updated
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function delet(req, res) {
    try {
        const { id } = req.params
        await deleteLog(id)

        return res.status(200).json({
            message: 'Log apagado com sucesso'
        })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

async function search(req, res) {
    const searchTerm = req.query.s

    try {
        const logs = await searchLogs(searchTerm)
        return res.status(200).json(logs)
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
