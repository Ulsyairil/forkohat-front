import { Router } from 'express'

import { FAQList, createFAQ, destroyFAQ, editFAQ, getFAQ } from '../../controllers/superadmin/faqController.js'

const router = Router()

router.post('/superadmin/faq', FAQList)
router.get('/superadmin/faq', getFAQ)
router.post('/superadmin/faq/create', createFAQ)
router.post('/superadmin/faq/edit', editFAQ)
router.post('/superadmin/faq/delete', destroyFAQ)

export default router
