const express = require('express')
const router = express.Router()
const validator = require('../middleware/validator')
const { signUp, login } = require('../controllers/auth')

router.post('/signup',validator('register'),signUp)
router.post('/login',validator('login'),login)

module.exports = router