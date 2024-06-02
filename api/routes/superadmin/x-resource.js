import { Router } from 'express'
import { listAllPermissions, listAllPrograms, listAllRules, listAllStructure, listAllUsers } from '../../controllers/superadmin/x-resourceController.js'

const router = Router()

router.get('/superadmin/programs', listAllPrograms)
router.get('/superadmin/arragements', listAllStructure)
router.get('/superadmin/users', listAllUsers)
router.get('/superadmin/rules', listAllRules)
router.get('/superadmin/rule/permissions', listAllPermissions)

export default router