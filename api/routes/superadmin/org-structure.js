import { Router } from 'express'

import {
  createOrgStructure,
  deleteOrgStructure,
  editOrgStructure,
  getOrgStructure,
  listOrgStructures,
} from '../../controllers/superadmin/orgStructureController.js'

const router = Router()

router.post('/superadmin/orgs', listOrgStructures)
router.get('/superadmin/org', getOrgStructure)
router.post('/superadmin/org/create', createOrgStructure)
router.post('/superadmin/org/edit', editOrgStructure)
router.post('/superadmin/org/delete', deleteOrgStructure)

export default router
