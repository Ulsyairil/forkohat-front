import { Router } from 'express'
import {
    newsList,
    getNews,
    createNews,
    updateNews,
    deleteNews
} from '../../controllers/superadmin/newsController.js'
import rateLimit from '../../middleware/rateLimit.js'

const router = Router()

router.post('/superadmin/news', newsList)
router.get('/superadmin/news', getNews)
router.post('/superadmin/news/create', rateLimit, createNews)
router.put('/superadmin/news/edit', rateLimit, updateNews)
router.delete('/superadmin/news/delete', rateLimit, deleteNews)

export default router