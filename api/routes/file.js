import { Router } from 'express'
import { getFile } from '../controllers/fileController.js'

const router = Router()

router.post('/file', getFile)

export default router