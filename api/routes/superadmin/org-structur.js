import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createOrgStructure, deleteOrgStructure, editOrgStructure, getOrgStructure, listOrgStructures } from '~/api/controllers/superadmin/orgStructureController.js'

const router = Router()

router.post('/superadmin/orgs', listOrgStructures)
router.get('/superadmin/org', getOrgStructure)
router.post('/superadmin/org/create', rateLimit, createOrgStructure)
router.post('/superadmin/org/edit', rateLimit, editOrgStructure)
router.post('/superadmin/org/delete', rateLimit, deleteOrgStructure)

export default router