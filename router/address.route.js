const express = require('express')
const router = express.Router()

const {
    create,
    readOwn,
    update,
    delet,
    listAll,
    search
} = require('../controller/address.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// USUÁRIO
router.post('/', authMiddleware, create)
router.get('/', authMiddleware, readOwn)
router.patch('/:id', authMiddleware, update)
router.delete('/:id', authMiddleware, delet)

// ADMIN
router.get('/admin/all', authMiddleware, isAdminMiddleware, listAll)
router.get('/admin/search', authMiddleware, isAdminMiddleware, search)

module.exports = router
