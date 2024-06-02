import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createUser, deleteUser, destroyUser, editPasswordUser, editUser, getUser, restoreUser, userList } from '../../controllers/superadmin/userController.js'
import { createUserRule, deleteUserRule, editUserRule, getUserRule, userRuleList } from '../../controllers/superadmin/userRuleController.js'

const router = Router()

router.post('/superadmin/users', userList)
router.get('/superadmin/user', getUser)
router.post('/superadmin/user/create', rateLimit, createUser)
router.post('/superadmin/user/edit', rateLimit, editUser)
router.post('/superadmin/user/password', rateLimit, editPasswordUser)
router.post('/superadmin/user/dump', rateLimit, deleteUser)
router.post('/superadmin/user/restore', rateLimit, restoreUser)
router.post('/superadmin/user/delete', rateLimit, destroyUser)

router.post('/superadmin/rules', userRuleList)
router.get('/superadmin/rule', getUserRule)
router.post('/superadmin/rule/create', rateLimit, createUserRule)
router.post('/superadmin/rule/edit', rateLimit, editUserRule)
router.post('/superadmin/rule/delete', rateLimit, deleteUserRule)

export default router