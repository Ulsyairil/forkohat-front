import { Router } from 'express'
import { newsList, getNews, createNews, updateNews, deleteNews } from '../../controllers/admin/newsController.js'

import {
  getNewsComment,
  newsCommentCreate,
  newsCommentDestroy,
  newsCommentEdit,
  newsCommentList,
} from '../../controllers/admin/newsCommentController.js'

const router = Router()

router.post('/admin/news', newsList)
router.get('/admin/news', getNews)
router.post('/admin/news/create', createNews)
router.put('/admin/news/edit', updateNews)
router.delete('/admin/news/delete', deleteNews)

router.post('/admin/news/comments', newsCommentList)
router.get('/admin/news/comment', getNewsComment)
router.post('/admin/news/comment/create', newsCommentCreate)
router.post('/admin/news/comment/edit', newsCommentEdit)
router.post('/admin/news/comment/delete', newsCommentDestroy)

export default router
