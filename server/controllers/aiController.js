import ai from '../configs/ai.js'
import Resume from '../models/resumeModel.js'

// enhancing resume's professional summary
// POST: /api/ai/enhance-pro-sum
export async function enhanceProfessionalSummary(req, res) {
    try {
        const { userContent } = req.body

        if (!userContent) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const systemPrompt = 'You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return text no options or anything else.'

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({
            success: true,
            enhancedContent
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// enhancing resume's job description
// POST: /api/ai/enhance-job-desc
export async function enhanceJobDescription(req, res) {
    try {
        const { userContent } = req.body

        if (!userContent) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const systemPrompt = 'You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be only in 1-2 sentences also highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Only return text and no options or anything else'

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userContent
                }
            ]
        })

        const enhancedContent = response.choices[0].message.content

        return res.status(200).json({
            success: true,
            enhancedContent
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// upload resume
// POST: /api/ai/upload-resume
export async function uploadResume(req, res) {
    try {
        const { resumeText, title } = req.body
        const userId = req.userId

        if (!resumeText || !title) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const systemPrompt = 'You are an expert data extraction AI. Extract resume data and return it strictly in JSON format.'

        const userPrompt = `
        Extract data from this resume text: ${resumeText}

        Provide data in this exact JSON format.

        All dates MUST be in YYYY-MM format.

        If a person is currently employed:
        "is_current": true
        "end_date": ""

        Return empty strings for missing values.
        Do not return null.
        {
            "professional_summary": "",
            "skills": ["skill1", "skill2"],
            "personal_info": {
                "full_name": "",
                "email": "",
                "phone": "",
                "location": "",
                "linkedin": "",
                "website": "",
                "profession": ""
            },
            "experience": [
                {
                    "company": "",
                    "position": "",
                    "start_date": "",
                    "end_date": "",
                    "description": "",
                    "is_current": false
                }
            ],
            "project": [
                {
                    "name": "",
                    "type": "",
                    "description": "",
                    "link": ""
                }
            ],
            "education": [
                {
                    "institution": "",
                    "degree": "",
                    "field": "",
                    "start_date": "",
                    "graduation_date": "",
                    "gpa": ""
                }
            ]
        }`

        const response = await ai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userPrompt
                }
            ],
            response_format: {
                type: 'json_object'
            }
        })

        const extractedData = response.choices[0].message.content
        const parsedData = JSON.parse(extractedData)

        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        })

        return res.status(200).json({
            success: true,
            resumeId: newResume._id
        })

    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}