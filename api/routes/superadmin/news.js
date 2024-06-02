import { Router } from 'express'
import { newsList, getNews, createNews, updateNews, deleteNews } from '../../controllers/superadmin/newsController.js'

import {
  getNewsComment,
  newsCommentCreate,
  newsCommentDestroy,
  newsCommentEdit,
  newsCommentList,
} from '../../controllers/superadmin/newsCommentController.js'

const router = Router()

router.post('/superadmin/news', newsList)
router.get('/superadmin/news', getNews)
router.post('/superadmin/news/create', createNews)
router.put('/superadmin/news/edit', updateNews)
router.delete('/superadmin/news/delete', deleteNews)

router.post('/superadmin/news/comments', newsCommentList)
router.get('/superadmin/news/comment', getNewsComment)
router.post('/superadmin/news/comment/create', newsCommentCreate)
router.post('/superadmin/news/comment/edit', newsCommentEdit)
router.post('/superadmin/news/comment/delete', newsCommentDestroy)

export default router
