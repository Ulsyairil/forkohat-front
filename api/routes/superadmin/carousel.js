import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { createCarousel, deleteCarousel, editCarousel, getCarousel, listCarousel } from '../../controllers/superadmin/carouselController.js'

const router = Router()

router.post('/superadmin/carousels', listCarousel)
router.get('/superadmin/carousel', getCarousel)
router.post('/superadmin/carousel/create', rateLimit, createCarousel)
router.post('/superadmin/carousel/edit', rateLimit, editCarousel)
router.post('/superadmin/carousel/delete', rateLimit, deleteCarousel)

export default router