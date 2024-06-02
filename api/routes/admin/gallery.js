import { Router } from 'express'

import { createGallery, deleteGallery, editGallery, listGallery } from '../../controllers/admin/galleryController.js'

const router = Router()

router.post('/admin/gallery', listGallery)
router.post('/admin/gallery/create', createGallery)
router.post('/admin/gallery/edit', editGallery)
router.post('/admin/gallery/delete', deleteGallery)

export default router
