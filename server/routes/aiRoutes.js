import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from '../controllers/aiController.js'

const aiRouter = express.Router()

aiRouter.route('/enhance-pro-sum')
    .post(protect, enhanceProfessionalSummary)

aiRouter.route('/enhance-job-desc')
    .post(protect, enhanceJobDescription)

aiRouter.route('/upload-resume')
    .post(protect, uploadResume)

export default aiRouter