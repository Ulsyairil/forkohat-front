import { Router } from 'express'

import {
  createCarousel,
  deleteCarousel,
  editCarousel,
  getCarousel,
  listCarousel,
} from '../../controllers/admin/carouselController.js'

const router = Router()

router.post('/admin/carousels', listCarousel)
router.get('/admin/carousel', getCarousel)
router.post('/admin/carousel/create', createCarousel)
router.post('/admin/carousel/edit', editCarousel)
router.post('/admin/carousel/delete', deleteCarousel)

export default router
