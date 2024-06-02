import { Router } from 'express'

import {
  createOrgStructure,
  deleteOrgStructure,
  editOrgStructure,
  getOrgStructure,
  listOrgStructures,
} from '../../controllers/admin/orgStructureController.js'

const router = Router()

router.post('/admin/orgs', listOrgStructures)
router.get('/admin/org', getOrgStructure)
router.post('/admin/org/create', createOrgStructure)
router.post('/admin/org/edit', editOrgStructure)
router.post('/admin/org/delete', deleteOrgStructure)

export default router
