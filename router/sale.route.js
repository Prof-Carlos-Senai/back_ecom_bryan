const express = require('express')
const router = express.Router()

const {
    create,
    list,
    listUser,
    update
} = require('../controller/sale.controller')

// Midlewares
const authMiddleware = require('../middleware/auth.middleware')
const { isAdminMiddleware } = require('../middleware/isAdmin.middleware')

router.post('/', authMiddleware, create)

// ESSE LISTA DE TODO MUNDO, SÓ ADMIN PODE VER
router.get('/', authMiddleware, isAdminMiddleware, list)

// ESSE LISTA O DO USUÁRIO, PARA ELE VER
router.get('/:id', authMiddleware, listUser)

router.patch('/:id', authMiddleware, update)

module.exports = router