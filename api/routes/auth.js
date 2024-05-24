import { Router } from 'express'
import {
    login,
    refreshToken,
    register,
    user
} from '../controllers/authController'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.post('/me', user)
router.post('/refresh-token', refreshToken)

export default router