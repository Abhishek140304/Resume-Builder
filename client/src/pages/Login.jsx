import React from 'react'
import { LoaderCircleIcon, LockIcon, MailIcon, User2Icon } from 'lucide-react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function Login() {
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState || "login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let data;
      if (state === 'login') {
        ({ data } = await api.post(`/api/users/login`, formData))
        dispatch(login({ user: data.user }))
      }
      else if (state === 'register') {
        ({ data } = await api.post(`/api/users/register`, formData))
        dispatch(login({ user: data.user }))
      }
      else if (state === 'forgotPassword') {
        ({ data } = await api.post("/api/users/forgot-password", {
          email: formData.email,
        }));
      }

      toast.success(data.message)
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form onSubmit={handleSubmit} className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">

        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : state === "register" ? "Sign up" : "Reset Password"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          {state === "forgotPassword" ? "Enter your email to receive a reset link" : `Please ${state} to continue`}
        </p>

        {state === "register" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color='#6b7280' />
            <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.name} onChange={handleChange} required />
          </div>
        )}

        <div className={`flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ${state === "register" ? "mt-4" : "mt-6"}`}>
          <MailIcon size={16} color='#6b7280' />
          <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.email} onChange={handleChange} required />
        </div>

        {state !== 'forgotPassword' && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <LockIcon size={16} color='#6b7280' />
            <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0 w-full bg-transparent" value={formData.password} onChange={handleChange} required />
          </div>
        )}

        {state === 'login' && (
          <div className="mt-4 text-left text-green-500">
            <button className="text-sm cursor-pointer" type="button" onClick={() => setState('forgotPassword')}>Forget password?</button>
          </div>
        )}

        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center gap-2" disabled={isLoading}>
          {isLoading && <LoaderCircleIcon className='animate-spin size-4 text-white' />}
          {state === "login" ? "Login" : state === "register" ? "Sign up" : isLoading ? "Sending Link" : "Send Reset Link"}
        </button>

        {state === "forgotPassword" ? (
          <p className="text-gray-500 text-sm mt-4 mb-11">
            Back to <span onClick={() => setState("login")} className="text-green-500 hover:underline cursor-pointer">Login</span>
          </p>
        ) : (
          <p className="text-gray-500 text-sm mt-4 mb-11">
            {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-green-500 hover:underline cursor-pointer">
              click here
            </span>
          </p>
        )}
      </form>
    </div>
  )
}
