import { Router } from 'express'
import { newsList, getNews, createNews, updateNews, deleteNews } from '../../controllers/superadmin/newsController.js'
import rateLimit from '../../middleware/rateLimit.js'
import { getNewsComment, newsCommentCreate, newsCommentDestroy, newsCommentEdit, newsCommentList } from '../../controllers/superadmin/newsCommentController.js'

const router = Router()

router.post('/superadmin/news', newsList)
router.get('/superadmin/news', getNews)
router.post('/superadmin/news/create', rateLimit, createNews)
router.put('/superadmin/news/edit', rateLimit, updateNews)
router.delete('/superadmin/news/delete', rateLimit, deleteNews)

router.post('/superadmin/news/comments', newsCommentList)
router.get('/superadmin/news/comment', getNewsComment)
router.post('/superadmin/news/comment/create', rateLimit, newsCommentCreate)
router.post('/superadmin/news/comment/edit', rateLimit, newsCommentEdit)
router.post('/superadmin/news/comment/delete', rateLimit, newsCommentDestroy)

export default router