import { Loader2Icon, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import api from '../../configs/api'
import toast from 'react-hot-toast'

export default function ProfessionalSummaryForm(props) {

  const [isGenerating, setIsGenerating] = useState(false)

  async function generateSummary() {
    try {

      if (!props.data.trim()) {
        toast.error('Please write a summary first');
        return;
      }
      setIsGenerating(true)

      const prompt = `enhance my professional summary "${props.data}"`

      const response = await api.post('/api/ai/enhance-pro-sum', { userContent: prompt })

      props.setResumeData(prev => ({ ...prev, professional_summary: response.data.enhancedContent }))
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message)
      console.log(error.message)
    }
    finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
          <p className='text-sm text-gray-600'>Add summary for your resume here</p>

          <button onClick={generateSummary} disabled={isGenerating} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50'>
            {isGenerating ? (<Loader2Icon className='size-4 animate-spin' />) : (<Sparkles className='size-4' />)}

            {isGenerating ? "Enhancing..." : "AI Enhance"}

          </button>

          <div className='mt-6'>

            <textarea value={props.data || ''} rows={7} onChange={(e) => props.onChange(e.target.value)} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='Write a compelling professional summary that highlights your key strengths and career objectives...'></textarea>

            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'><strong>Tip: </strong>Keep it concise (3-4 sentences) and focus on your most relavant achievements and skills.</p>

          </div>

        </div>
      </div>
    </div>
  )
}
