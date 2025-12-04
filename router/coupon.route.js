const express = require('express')
const router = express.Router()

const {
    create,
    read,
    list,
    update,
    delet,
    search
} = require('../controller/coupon.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

// ADMIN - CRUD + SEARCH
router.post('/', authMiddleware, isAdminMiddleware, create)
router.get('/:id', authMiddleware, isAdminMiddleware, read)
router.get('/', authMiddleware, isAdminMiddleware, list)
router.patch('/:id', authMiddleware, isAdminMiddleware, update)
router.delete('/:id', authMiddleware, isAdminMiddleware, delet)
router.get('/search/all', authMiddleware, isAdminMiddleware, search)
module.exports = router
