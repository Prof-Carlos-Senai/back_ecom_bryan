const express = require('express')
const router = express.Router()

const {
    create,
    list,
    update,
    delet,
    search
} = require('../controller/category.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

router.post('/', authMiddleware, isAdminMiddleware, create)
router.get('/', authMiddleware, isAdminMiddleware, list)
router.patch('/:id', authMiddleware, isAdminMiddleware, update)
router.delete('/:id', authMiddleware, isAdminMiddleware, delet)
router.get('/search', authMiddleware, isAdminMiddleware, search)

module.exports = router
