import { Router } from 'express'
import { listAllPrograms } from '~/api/controllers/superadmin/x-resourceController.js'

const router = Router()

router.get('/superadmin/program', listAllPrograms)

export default router