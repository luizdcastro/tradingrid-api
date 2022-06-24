const express = require("express")
const router = express.Router()
const exchangeController = require('../controllers/exchangeController')

router
    .route('/')
    .post(exchangeController.createExchange)

router
    .route('/:id')
    .delete(exchangeController.deleteExchange)

module.exports = router