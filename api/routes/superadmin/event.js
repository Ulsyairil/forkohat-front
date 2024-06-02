import { Router } from 'express'

import {
  createEvent,
  deleteEvent,
  destroyEvent,
  editEvent,
  getEvent,
  listEvents,
  restoreEvent,
} from '../../controllers/superadmin/eventController.js'
import {
  createEventComment,
  deleteEventComment,
  editEventComment,
  getEventComment,
  listEventComments,
} from '../../controllers/superadmin/eventCommentController.js'
import {
  createEventFile,
  deleteEventFile,
  editEventFile,
  getEventFile,
  listEventFiles,
} from '../../controllers/superadmin/eventFileController.js'

const router = Router()

router.post('/superadmin/events', listEvents)
router.get('/superadmin/event', getEvent)
router.post('/superadmin/event/create', createEvent)
router.post('/superadmin/event/edit', editEvent)
router.post('/superadmin/event/restore', restoreEvent)
router.post('/superadmin/event/dump', deleteEvent)
router.post('/superadmin/event/delete', destroyEvent)

router.post('/superadmin/event/comments', listEventComments)
router.get('/superadmin/event/comment', getEventComment)
router.post('/superadmin/event/comment/create', createEventComment)
router.post('/superadmin/event/comment/edit', editEventComment)
router.post('/superadmin/event/comment/delete', deleteEventComment)

router.post('/superadmin/event/file', listEventFiles)
router.get('/superadmin/event/file', getEventFile)
router.post('/superadmin/event/file/add', createEventFile)
router.post('/superadmin/event/file/edit', editEventFile)
router.post('/superadmin/event/file/delete', deleteEventFile)

export default router
