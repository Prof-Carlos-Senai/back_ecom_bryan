const express = require('express')
const router = express.Router()

const {
    create,
    listOwn,
    updateQuantity,
    delet,
    listAll
} = require('../controller/cart_item.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// USUÁRIO
router.post('/', authMiddleware, create)
router.get('/', authMiddleware, listOwn)
router.patch('/:id/quantity', authMiddleware, updateQuantity)
router.delete('/:id', authMiddleware, delet)

// ADMIN
router.get('/admin/all', authMiddleware, isAdminMiddleware, listAll)

module.exports = router
