const express = require("express")
const router = express.Router()
const botController = require('../controllers/botController')

router
    .route('/')
    .post(botController.createBot)

router
    .route('/:id')
    .get(botController.getBot)   
    .delete(botController.deleteBot)   
    .patch(botController.updateBot)   

module.exports = router