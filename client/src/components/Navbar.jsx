import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '../configs/api'
import { logout } from '../app/features/authSlice'
import toast from 'react-hot-toast'

export default function Navbar() {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function logoutUser() {
    try {
      const {data} = await api.post('/api/users/logout')

      dispatch(logout())
      navigate('/')
      toast.success(data.message)
    }
    catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }

  }


  return (
    <div className='shadow bg-white'>
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
        <Link to='/'>
          <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
        </Link>
        <div className='flex items-center gap-4 text-sm'>
          <p className='max-sm:hidden'>Hi, {user?.name}</p>
          <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all cursor-pointer'>Logout</button>
        </div>
      </nav>
    </div>
  )
}
