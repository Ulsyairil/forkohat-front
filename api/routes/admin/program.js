import { Router } from 'express'

import {
  createProgram,
  destroyProgram,
  editProgram,
  getProgram,
  programList,
} from '../../controllers/admin/programController.js'
import {
  createStructure,
  destroyStructure,
  editStructure,
  getStructure,
  structureList,
} from '../../controllers/admin/structureController.js'
import {
  createStructureItem,
  deleteStructureItem,
  editStructureItem,
  getStructureItem,
  listStructureItem,
  restoreStructureItem,
} from '../../controllers/admin/itemStructureController.js'

const router = Router()

router.post('/admin/programs', programList)
router.get('/admin/program', getProgram)
router.post('/admin/program/create', createProgram)
router.post('/admin/program/edit', editProgram)
router.post('/admin/program/delete', destroyProgram)

router.post('/admin/arrangements', structureList)
router.get('/admin/arrangement', getStructure)
router.post('/admin/arrangement/create', createStructure)
router.post('/admin/arrangement/edit', editStructure)
router.post('/admin/arrangement/delete', destroyStructure)

router.post('/admin/arrangement/items', listStructureItem)
router.get('/admin/arrangement/item', getStructureItem)
router.post('/admin/arrangement/item/create', createStructureItem)
router.post('/admin/arrangement/item/edit', editStructureItem)
router.post('/admin/arrangement/item/dump', deleteStructureItem)
router.post('/admin/arrangement/item/restore', restoreStructureItem)
router.post('/admin/arrangement/item/delete', deleteStructureItem)

export default router
