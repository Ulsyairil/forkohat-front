import { Router } from 'express'

import {
  createProgram,
  destroyProgram,
  editProgram,
  getProgram,
  programList,
} from '../../controllers/superadmin/programController.js'
import {
  createStructure,
  destroyStructure,
  editStructure,
  getStructure,
  structureList,
} from '../../controllers/superadmin/structureController.js'
import {
  createStructureItem,
  deleteStructureItem,
  editStructureItem,
  getStructureItem,
  listStructureItem,
  restoreStructureItem,
} from '../../controllers/superadmin/itemStructureController.js'

const router = Router()

router.post('/superadmin/programs', programList)
router.get('/superadmin/program', getProgram)
router.post('/superadmin/program/create', createProgram)
router.post('/superadmin/program/edit', editProgram)
router.post('/superadmin/program/delete', destroyProgram)

router.post('/superadmin/arrangements', structureList)
router.get('/superadmin/arrangement', getStructure)
router.post('/superadmin/arrangement/create', createStructure)
router.post('/superadmin/arrangement/edit', editStructure)
router.post('/superadmin/arrangement/delete', destroyStructure)

router.post('/superadmin/arrangement/items', listStructureItem)
router.get('/superadmin/arrangement/item', getStructureItem)
router.post('/superadmin/arrangement/item/create', createStructureItem)
router.post('/superadmin/arrangement/item/edit', editStructureItem)
router.post('/superadmin/arrangement/item/dump', deleteStructureItem)
router.post('/superadmin/arrangement/item/restore', restoreStructureItem)
router.post('/superadmin/arrangement/item/delete', deleteStructureItem)

export default router
