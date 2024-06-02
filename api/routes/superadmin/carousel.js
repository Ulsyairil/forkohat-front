import { Router } from 'express'
import {
  createCarousel,
  deleteCarousel,
  editCarousel,
  getCarousel,
  listCarousel,
} from '../../controllers/superadmin/carouselController.js'

const router = Router()

router.post('/superadmin/carousels', listCarousel)
router.get('/superadmin/carousel', getCarousel)
router.post('/superadmin/carousel/create', createCarousel)
router.post('/superadmin/carousel/edit', editCarousel)
router.post('/superadmin/carousel/delete', deleteCarousel)

export default router
