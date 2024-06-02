import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createProgram, destroyProgram, editProgram, getProgram, programList } from '~/api/controllers/superadmin/programController.js'
import { createStructure, destroyStructure, editStructure, getStructure, structureList } from '~/api/controllers/superadmin/structureController.js'

const router = Router()

router.post('/superadmin/programs', programList)
router.get('/superadmin/program', getProgram)
router.post('/superadmin/program/create', rateLimit, createProgram)
router.post('/superadmin/program/edit', rateLimit, editProgram)
router.post('/superadmin/program/delete', rateLimit, destroyProgram)

router.post('/superadmin/arrangements', structureList)
router.get('/superadmin/arrangement', getStructure)
router.post('/superadmin/arrangement/create', rateLimit, createStructure)
router.post('/superadmin/arrangement/edit', rateLimit, editStructure)
router.post('/superadmin/arrangement/delete', rateLimit, destroyStructure)

export default router