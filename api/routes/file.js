import { Router } from 'express'
import { getFile } from '../controllers/fileController.js'

const router = Router()

router.get('/file/:mime/:filename', getFile)

export default router
