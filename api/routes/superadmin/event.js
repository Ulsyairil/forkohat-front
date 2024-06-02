import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createEvent, deleteEvent, destroyEvent, editEvent, getEvent, listEvents, restoreEvent } from '../../controllers/superadmin/eventController.js'
import { createEventComment, deleteEventComment, editEventComment, getEventComment, listEventComments } from '../../controllers/superadmin/eventCommentController.js'
import { createEventFile, deleteEventFile, editEventFile, getEventFile, listEventFiles } from '../../controllers/superadmin/eventFileController.js'

const router = Router()

router.post('/superadmin/events', listEvents)
router.get('/superadmin/event', getEvent)
router.post('/superadmin/event/create', rateLimit, createEvent)
router.post('/superadmin/event/edit', rateLimit, editEvent)
router.post('/superadmin/event/restore', rateLimit, restoreEvent)
router.post('/superadmin/event/dump', rateLimit, deleteEvent)
router.post('/superadmin/event/delete', rateLimit, destroyEvent)

router.post('/superadmin/event/comments', listEventComments)
router.get('/superadmin/event/comment', getEventComment)
router.post('/superadmin/event/comment/create', rateLimit, createEventComment)
router.post('/superadmin/event/comment/edit', rateLimit, editEventComment)
router.post('/superadmin/event/comment/delete', rateLimit, deleteEventComment)

router.post('/superadmin/event/file', listEventFiles)
router.get('/superadmin/event/file', getEventFile)
router.post('/superadmin/event/file/add', rateLimit, createEventFile)
router.post('/superadmin/event/file/edit', rateLimit, editEventFile)
router.post('/superadmin/event/file/delete', rateLimit, deleteEventFile)

export default router