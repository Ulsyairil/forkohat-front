import { Router } from 'express'
import {
    newsList
} from '../../controllers/superadmin/newsController'

const router = Router()

router.post('/superadmin/news', newsList)

export default router