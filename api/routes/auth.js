const Route = require('express').Router()
const authController = require('../controllers/authController')

Route.get('/login', authController.login)

module.exports = Route
