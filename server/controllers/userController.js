import User from '../models/userModel.js'
import Resume from '../models/resumeModel.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import transporter from '../configs/mail.js'


function generateToken(userId) {
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
    return token
}

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
}

// controller for user registration
// POST: /api/users/register
export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exist"
            });
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(newUser._id)

        res.cookie('token', token, cookieOptions)

        newUser.password = undefined
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// controller for user login
// POST: /api/users/login
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id)
        res.cookie('token', token, cookieOptions)

        user.password = undefined
        return res.status(200).json({
            success: true,
            message: 'Login successfull',
            user: user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// POST/GET: /api/users/logout
export async function logoutUser(req, res) {
    res.clearCookie('token');

    return res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
}

// controller for getting user by id
// GET: /api/users/data
export async function getUserById(req, res) {
    try {
        const userId = req.userId

        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        user.password = undefined
        return res.status(200).json({
            success: true,
            user: user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// controller for getting user resumes
// GET: /api/users/resumes
export async function getUserResumes(req, res) {
    try {
        const userId = req.userId

        const resumes = await Resume.find({ userId })

        return res.status(200).json({
            success: true,
            resumes
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// POST: /api/users/forgot-password
export async function forgotPassword(req, res) {
    try {
        const { email } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString('hex')

        // Store hashed token
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        // Expiry = 15 mins
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000

        await user.save()

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

        try {
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: user.email,
                subject: 'Password Reset',
                html: `
                <h2>Password Reset</h2>
                <p>Click below:</p>
                <a href="${resetUrl}">
                    Reset Password
                </a>
            `
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            throw error;
        }

        return res.status(200).json({
            success: true,
            message: 'Reset link sent to email'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// POST: /api/users/reset-password
export async function resetPassword(req, res) {
    try {
        const { token } = req.params
        const { password } = req.body

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: {
                $gt: Date.now()
            }
        })

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Token expired or invalid'
            })
        }

        user.password = password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}