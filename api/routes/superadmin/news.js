import { Router } from 'express'
import {
    newsList,
    getNews,
    createNews,
    updateNews,
    deleteNews
} from '../../controllers/superadmin/newsController.js'

const router = Router()

router.post('/superadmin/news', newsList)
router.get('/superadmin/news', getNews)
router.post('/superadmin/news/create', createNews)
router.put('/superadmin/news/edit', updateNews)
router.delete('/superadmin/news/delete', deleteNews)

export default router