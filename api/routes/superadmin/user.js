import { Router } from 'express'

import {
  createUser,
  deleteUser,
  destroyUser,
  editPasswordUser,
  editUser,
  getUser,
  restoreUser,
  userList,
} from '../../controllers/superadmin/userController.js'
import {
  createUserRule,
  deleteUserRule,
  editUserRule,
  getUserRule,
  userRuleList,
} from '../../controllers/superadmin/userRuleController.js'
import {
  createPermission,
  deletePermission,
  editPermission,
  permissionList,
} from '../../controllers/superadmin/rulePermissionController.js'

const router = Router()

router.post('/superadmin/users', userList)
router.get('/superadmin/user', getUser)
router.post('/superadmin/user/create', createUser)
router.post('/superadmin/user/edit', editUser)
router.post('/superadmin/user/password', editPasswordUser)
router.post('/superadmin/user/dump', deleteUser)
router.post('/superadmin/user/restore', restoreUser)
router.post('/superadmin/user/delete', destroyUser)

router.post('/superadmin/rules', userRuleList)
router.get('/superadmin/rule', getUserRule)
router.post('/superadmin/rule/create', createUserRule)
router.post('/superadmin/rule/edit', editUserRule)
router.post('/superadmin/rule/delete', deleteUserRule)

router.post('/superadmin/rule/permissions', permissionList)
router.post('/superadmin/rule/permission/create', createPermission)
router.post('/superadmin/rule/permission/edit', editPermission)
router.post('/superadmin/rule/permission/delete', deletePermission)

export default router
