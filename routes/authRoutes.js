const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/:wallet', authController.auth)

module.exports = router