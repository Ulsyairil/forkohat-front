import { Router } from 'express'
import rateLimit from '../../middleware/rateLimit.js'
import { FAQList, createFAQ, destroyFAQ, editFAQ, getFAQ } from '~/api/controllers/superadmin/faqController.js'

const router = Router()

router.post('/superadmin/faq', FAQList);
router.get('/superadmin/faq', getFAQ);
router.post('/superadmin/faq/create', rateLimit, createFAQ);
router.post('/superadmin/faq/edit', rateLimit, editFAQ);
router.post('/superadmin/faq/delete', rateLimit, destroyFAQ);

export default router