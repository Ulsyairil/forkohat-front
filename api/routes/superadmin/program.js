import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createProgram, destroyProgram, editProgram, getProgram, programList } from '~/api/controllers/superadmin/programController.js'

const router = Router()

router.post('/superadmin/programs', programList)
router.get('/superadmin/program', getProgram)
router.post('/superadmin/program/create', rateLimit, createProgram)
router.post('/superadmin/program/edit', rateLimit, editProgram)
router.post('/superadmin/program/delete', rateLimit, destroyProgram)

export default router