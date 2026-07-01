import imageKit from "../configs/imageKit.js"
import Resume from "../models/resumeModel.js"
import fs from 'fs'


// creating a new resume
// POST: /api/resumes/create
export async function createResume(req, res) {
    try {
        const userId = req.userId
        const { title } = req.body

        const newResume = await Resume.create({
            userId,
            title
        })

        return res.status(201).json({
            success: true,
            message: 'Resume created successfully',
            resume: newResume
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// deleting a resume
// DELETE: /api/resumes/delete
export async function deleteResume(req, res) {
    try {
        const userId = req.userId
        const { resumeId } = req.params

        await Resume.findOneAndDelete({
            userId,
            _id: resumeId
        })

        return res.status(200).json({
            success: true,
            message: 'Resume deleted successfully'
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// updating a resume
// PUT: /api/resumes/update
export async function updateResume(req, res) {
    try {
        const userId = req.userId
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file

        let resumeDataCopy =
            typeof resumeData === 'string'
                ? await JSON.parse(resumeData)
                : resumeData;

        if (image) {
            const response = await imageKit.files.upload({
                file: image.buffer.toString('base64'),
                fileName: image.originalname,
                folder: 'user-resumes',
                transformation: {
                    pre:
                        'w-300,h-300,fo-face,z-0.75' +
                        (removeBackground ? ',e-bgremove' : '')
                }
            });

            if (!resumeDataCopy.personal_info) {
                resumeDataCopy.personal_info = {};
            }

            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findOneAndUpdate(
            { userId, _id: resumeId },
            resumeDataCopy,
            { new: true }
        )

        if (!resume) {
            return res.status(404).json({ success: false, message: 'Resume not found' });
        }

        return res.status(201).json({
            success: true,
            message: 'Saved successfully',
            resume
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get user resume by id
// GET: /api/resumes/get
export async function getResumeById(req, res) {
    try {
        const userId = req.userId
        const { resumeId } = req.params

        const resume = await Resume.findOne({
            userId,
            _id: resumeId
        })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            })
        }

        resume.__v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined

        return res.status(200).json({
            success: true,
            resume
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// get resume by id public
// GET: /api/resumes/public
export async function getPublicResumeById(req, res) {
    try {
        const { resumeId } = req.params

        const resume = await Resume.findOne({
            public: true,
            _id: resumeId
        })

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found'
            })
        }

        return res.status(200).json({
            success: true,
            resume
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}