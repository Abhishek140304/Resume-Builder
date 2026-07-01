import { Briefcase, Loader2Icon, Plus, Sparkles, Trash } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

export default function ExperienceForm(props) {

    const [generatingIndex, setGeneratingIndex] = useState(-1)

    function addExperience() {
        const newExperience = {
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            is_current: false
        }

        props.onChange([...props.data, newExperience])
    }

    function removeExperience(index) {
        const updated = props.data.filter((_, i) => i != index)

        props.onChange(updated)
    }

    function updateExperience(index, field, value) {
        const updated = [...props.data]
        updated[index] = { ...updated[index], [field]: value }

        props.onChange(updated)
    }

    async function generateDescription(index) {

        setGeneratingIndex(index)
        const experience = props.data[index]

        if(!experience.description.trim()){
            toast.error('Please write a description first');
            setGeneratingIndex(-1)
            return;
        }
        const prompt = `enhance this job description "${experience.description}" for the position of "${experience.position}" at "${experience.company}"`

        try {
    
          const response = await api.post('/api/ai/enhance-job-desc', { userContent: prompt })

          updateExperience(index, 'description', response.data.enhancedContent)
        }
        catch (error) {
          toast.error(error?.response?.data?.message || error.message)
          console.log(error.message)
        }
        finally {
          setGeneratingIndex(-1)
        }
      }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>

                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                    <p className='text-sm text-gray-600'>Add your job experience</p>
                </div>

                <button onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' />
                    Add Experience
                </button>

            </div>

            {props.data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No work experience added yet.</p>
                    <p className='text-sm'>Click "Add Experience" to get started</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {props.data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Experience #{index + 1}</h4>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input value={experience.company || ''} onChange={(e) => updateExperience(index, 'company', e.target.value)} type="text" placeholder='Company Name' className='px-3 py-2 text-sm rounded-lg' />

                                <input value={experience.position || ''} onChange={(e) => updateExperience(index, 'position', e.target.value)} type="text" placeholder='Job Title' className='px-3 py-2 text-sm rounded-lg' />

                                <input value={experience.start_date || ''} onChange={(e) => updateExperience(index, 'start_date', e.target.value)} type="month" className='px-3 py-2 text-sm rounded-lg' />

                                <input value={experience.end_date || ''} onChange={(e) => updateExperience(index, 'end_date', e.target.value)} type="month" disabled={experience.is_current} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' />

                            </div>

                            <label className='flex items-center gap-2'>
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e) => { updateExperience(index, 'is_current', e.target.checked ? true : false) }} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500' />
                                <span className='text-sm text-gray-700'>Currently working here</span>
                            </label>

                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium'>Job Description</label>
                                    <button onClick={() => generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
                                        {generatingIndex === index ? (<Loader2Icon className='size-4 animate-spin' />) : (<Sparkles className='size-4' />)}

                                        {generatingIndex === index ? "Enhancing..." : "AI Enhance"}
                                    </button>
                                </div>
                                <textarea onChange={(e) => updateExperience(index, 'description', e.target.value)} value={experience.description || ''} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Describe your key responsibilities and achievements...' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
