const express = require('express')
const router = express.Router()

const {
    create,
    list,
    update,
    search,
    listAdmin
} = require('../controller/payment.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// PÚBLICAS
router.post('/', create)
router.get('/', list)
router.patch('/:id', update)

// PRIVADAS (ADMIN)
router.get('/admin/search', authMiddleware, isAdminMiddleware, search)
router.get('/admin/all', authMiddleware, isAdminMiddleware, listAdmin)

module.exports = router
