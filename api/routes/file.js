import { Router } from 'express'
import { getFile } from '../controllers/fileController'

const router = Router()

router.post('/file', getFile)

export default router