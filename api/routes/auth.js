import { Router } from 'express'
import {
    login,
    refreshToken,
    register,
    user
} from '../controllers/authController.js'
import rateLimit from '../middleware/rateLimit.js'

const router = Router()

router.post('/login', rateLimit, login)
router.post('/register', rateLimit, register)
router.post('/me', user)
router.post('/refresh-token', refreshToken)

export default router