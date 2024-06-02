import { Router } from 'express'
import {
  listAllOrgStructure,
  listAllPermissions,
  listAllPrograms,
  listAllRules,
  listAllStructure,
  listAllUsers,
} from '../../controllers/admin/x-resourceController.js'

const router = Router()

router.get('/admin/programs', listAllPrograms)
router.get('/admin/arragements', listAllStructure)
router.get('/admin/users', listAllUsers)
router.get('/admin/rules', listAllRules)
router.get('/admin/rule/permissions', listAllPermissions)
router.get('/admin/orgs', listAllOrgStructure)

export default router
