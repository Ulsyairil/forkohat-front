import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createGallery, deleteGallery, editGallery, listGallery } from '../../controllers/superadmin/galleryController.js'

const router = Router()

router.post('/superadmin/gallery', listGallery)
router.post('/superadmin/gallery/create', rateLimit, createGallery)
router.post('/superadmin/gallery/edit', rateLimit, editGallery)
router.post('/superadmin/gallery/delete', rateLimit, deleteGallery)

export default router