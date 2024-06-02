import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createProgram, destroyProgram, editProgram, getProgram, programList } from '../../controllers/superadmin/programController.js'
import { createStructure, destroyStructure, editStructure, getStructure, structureList } from '../../controllers/superadmin/structureController.js'
import { createStructureItem, deleteStructureItem, editStructureItem, getStructureItem, listStructureItem, restoreStructureItem } from '../../controllers/superadmin/itemStructureController.js'

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

router.post('/superadmin/arrangement/items', listStructureItem)
router.get('/superadmin/arrangement/item', getStructureItem)
router.post('/superadmin/arrangement/item/create', rateLimit, createStructureItem)
router.post('/superadmin/arrangement/item/edit', rateLimit, editStructureItem)
router.post('/superadmin/arrangement/item/dump', rateLimit, deleteStructureItem)
router.post('/superadmin/arrangement/item/restore', rateLimit, restoreStructureItem)
router.post('/superadmin/arrangement/item/delete', rateLimit, deleteStructureItem)

export default router