import { Router } from 'express'

import { FAQList, createFAQ, destroyFAQ, editFAQ, getFAQ } from '../../controllers/admin/faqController.js'

const router = Router()

router.post('/admin/faq', FAQList)
router.get('/admin/faq', getFAQ)
router.post('/admin/faq/create', createFAQ)
router.post('/admin/faq/edit', editFAQ)
router.post('/admin/faq/delete', destroyFAQ)

export default router
