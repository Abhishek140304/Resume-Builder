import express from 'express'
import { forgotPassword, getUserById, getUserResumes, loginUser, logoutUser, registerUser, resetPassword } from '../controllers/userController.js'
import protect from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.route('/register')
    .post(registerUser)

userRouter.route('/login')
    .post(loginUser)

userRouter.route('/logout')
    .post(logoutUser)

userRouter.route('/forgot-password')
    .post(forgotPassword)

userRouter.route('/reset-password/:token')
    .post(resetPassword)

userRouter.route('/data')
    .get(protect, getUserById)

userRouter.route('/resumes')
    .get(protect, getUserResumes)


export default userRouter