import { Router } from 'express'

import {
  createEvent,
  deleteEvent,
  destroyEvent,
  editEvent,
  getEvent,
  listEvents,
  restoreEvent,
} from '../../controllers/admin/eventController.js'
import {
  createEventComment,
  deleteEventComment,
  editEventComment,
  getEventComment,
  listEventComments,
} from '../../controllers/admin/eventCommentController.js'
import {
  createEventFile,
  deleteEventFile,
  editEventFile,
  getEventFile,
  listEventFiles,
} from '../../controllers/admin/eventFileController.js'

const router = Router()

router.post('/admin/events', listEvents)
router.get('/admin/event', getEvent)
router.post('/admin/event/create', createEvent)
router.post('/admin/event/edit', editEvent)
router.post('/admin/event/restore', restoreEvent)
router.post('/admin/event/dump', deleteEvent)
router.post('/admin/event/delete', destroyEvent)

router.post('/admin/event/comments', listEventComments)
router.get('/admin/event/comment', getEventComment)
router.post('/admin/event/comment/create', createEventComment)
router.post('/admin/event/comment/edit', editEventComment)
router.post('/admin/event/comment/delete', deleteEventComment)

router.post('/admin/event/file', listEventFiles)
router.get('/admin/event/file', getEventFile)
router.post('/admin/event/file/add', createEventFile)
router.post('/admin/event/file/edit', editEventFile)
router.post('/admin/event/file/delete', deleteEventFile)

export default router
