const express = require('express')
const router = express.Router()

const {
    create,
    creatAdmin,
    search,
    list,
    update,
    updatCoin,
    delet
} = require('../controller/user.controller')

// Middlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware, isOwnerMiddleware } = require('../middleware/isAdmin.middleware')

router.post('/', create)

router.post('/admin', authMiddleware, isOwnerMiddleware, creatAdmin)

router.get('/search', authMiddleware, isAdminMiddleware, search)

router.get('/', authMiddleware, isAdminMiddleware, list)

router.patch('/:id', authMiddleware, update)

router.patch('/coin/:id', authMiddleware, updatCoin)

router.delete('/:id', authMiddleware, delet)

module.exports = router