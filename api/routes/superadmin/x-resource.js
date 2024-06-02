import { Router } from 'express'
import { listAllPrograms, listAllStructure, listAllUsers } from '~/api/controllers/superadmin/x-resourceController.js'

const router = Router()

router.get('/superadmin/programs', listAllPrograms)
router.get('/superadmin/arragements', listAllStructure)
router.get('/superadmin/users', listAllUsers)

export default router