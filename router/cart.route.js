const express = require('express')
const router = express.Router()

const {
    create,
    readOwn,
    updateTotal,
    listAll,
    search
} = require('../controller/cart.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// USUÁRIO
router.post('/', authMiddleware, create)
router.get('/', authMiddleware, readOwn)
router.get('/search', authMiddleware, search)
router.patch('/:id/quantity', authMiddleware, updateTotal)

// ADMIN
router.get('/admin/all', authMiddleware, isAdminMiddleware, listAll)

module.exports = router