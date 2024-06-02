import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createEvent, deleteEvent, destroyEvent, editEvent, getEvent, listEvents, restoreEvent } from '../../controllers/superadmin/eventController.js'

const router = Router()

router.post('/superadmin/events', listEvents)
router.get('/superadmin/event', getEvent)
router.post('/superadmin/event/create', rateLimit, createEvent)
router.post('/superadmin/event/edit', rateLimit, editEvent)
router.post('/superadmin/event/restore', rateLimit, restoreEvent)
router.post('/superadmin/event/dump', rateLimit, deleteEvent)
router.post('/superadmin/event/delete', rateLimit, destroyEvent)

export default router