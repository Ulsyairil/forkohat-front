import { Router } from 'express'

import {
  createGallery,
  deleteGallery,
  editGallery,
  listGallery,
} from '../../controllers/superadmin/galleryController.js'

const router = Router()

router.post('/superadmin/gallery', listGallery)
router.post('/superadmin/gallery/create', createGallery)
router.post('/superadmin/gallery/edit', editGallery)
router.post('/superadmin/gallery/delete', deleteGallery)

export default router
