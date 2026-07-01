import { GraduationCap, Plus, Trash } from 'lucide-react'
import React from 'react'

export default function EducationForm(props) {

    function addEducation() {
        const newEducation = {
            institution: '',
            degree: '',
            field: '',
            graduation_date: '',
            gpa: '',
        }

        props.onChange([...props.data, newEducation])
    }

    function removeEducation(index) {
        const updated = props.data.filter((_, i) => i != index)

        props.onChange(updated)
    }

    function updateEducation(index, field, value) {
        const updated = [...props.data]
        updated[index] = { ...updated[index], [field]: value }

        props.onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>

                <div>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-600'>Add your Education details</p>
                </div>

                <button onClick={addEducation} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
                    <Plus className='size-4' />
                    Add Education
                </button>

            </div>

            {props.data.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No Education added yet.</p>
                    <p className='text-sm'>Click "Add Education" to get started</p>
                </div>
            ) : (
                <div className='space-y-4'>
                    {props.data.map((education, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Education #{index + 1}</h4>
                                <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>

                                <input value={education.institution || ''} onChange={(e) => updateEducation(index, 'institution', e.target.value)} type="text" placeholder='Institute Name' className='px-3 py-2 text-sm' />

                                <input value={education.degree || ''} onChange={(e) => updateEducation(index, 'degree', e.target.value)} type="text" placeholder="Degree (e.g., Bachelor's Master's)" className='px-3 py-2 text-sm' />

                                <input value={education.field || ''} onChange={(e) => updateEducation(index, 'field', e.target.value)} type="text" placeholder='Field of Study' className='px-3 py-2 text-sm' />

                                <input value={education.graduation_date || ''} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} type="month" className='px-3 py-2 text-sm' />

                                <input value={education.gpa || ''} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} type="text" placeholder='GPA (optional)' className='px-3 py-2 text-sm' />

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
