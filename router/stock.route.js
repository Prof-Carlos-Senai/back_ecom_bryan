const express = require('express')
const router = express.Router()

const {
    create,
    list
} = require('../controller/stock.controller')

// Rotas públicas
router.post('/', create)
router.get('/', list)

module.exports = router
