import express from 'express'
import protect from '../middlewares/authMiddleware.js'
import { createResume, deleteResume, getPublicResumeById, getResumeById, updateResume } from '../controllers/resumeController.js'
import upload from '../configs/multer.js'

const resumeRouter = express.Router()

resumeRouter.route('/create')
    .post(protect, createResume)

resumeRouter.route('/update')
    .put(upload.single('image'), protect, updateResume)

resumeRouter.route('/delete/:resumeId')
    .delete(protect, deleteResume)

resumeRouter.route('/get/:resumeId')
    .get(protect, getResumeById)

resumeRouter.route('/public/:resumeId')
    .get(getPublicResumeById)


export default resumeRouter