const express = require('express')
const router = express.Router()

const {
    create,
    search,
    list,
    listAdmin,
    update,
    delet
} = require('../controller/product.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// POST /produto
router.post(
    '/',
    authMiddleware, // precisa estar logado
    isAdminMiddleware, // precisa ser admin
    create
)

// GET /produto/search?q=nome
router.get('/search', authMiddleware, search)

router.get('/', list)

router.get('/admin', authMiddleware, isAdminMiddleware, listAdmin)

router.patch('/:id', authMiddleware, isAdminMiddleware, update)

router.delete('/:id', authMiddleware, isAdminMiddleware, delet)

module.exports = router