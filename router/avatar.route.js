const express = require('express')
const router = express.Router()

const {
    create,
    read,
    list,
    update,
    delet,
    search
} = require('../controller/avatar.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// ADMIN - CRUD + SEARCH
router.post('/', authMiddleware, isAdminMiddleware, create)
router.get('/:id', read)
router.get('/', list)
router.patch('/:id', authMiddleware, isAdminMiddleware, update)
router.delete('/:id', authMiddleware, isAdminMiddleware, delet)
router.get('/search/all', search)

module.exports = router
