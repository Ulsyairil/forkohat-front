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
} from '../../controllers/admin/userController.js'
import {
  createUserRule,
  deleteUserRule,
  editUserRule,
  getUserRule,
  userRuleList,
} from '../../controllers/admin/userRuleController.js'
import {
  createPermission,
  deletePermission,
  editPermission,
  permissionList,
} from '../../controllers/admin/rulePermissionController.js'

const router = Router()

router.post('/admin/users', userList)
router.get('/admin/user', getUser)
router.post('/admin/user/create', createUser)
router.post('/admin/user/edit', editUser)
router.post('/admin/user/password', editPasswordUser)
router.post('/admin/user/dump', deleteUser)
router.post('/admin/user/restore', restoreUser)
router.post('/admin/user/delete', destroyUser)

router.post('/admin/rules', userRuleList)
router.get('/admin/rule', getUserRule)
router.post('/admin/rule/create', createUserRule)
router.post('/admin/rule/edit', editUserRule)
router.post('/admin/rule/delete', deleteUserRule)

router.post('/admin/rule/permissions', permissionList)
router.post('/admin/rule/permission/create', createPermission)
router.post('/admin/rule/permission/edit', editPermission)
router.post('/admin/rule/permission/delete', deletePermission)

export default router
