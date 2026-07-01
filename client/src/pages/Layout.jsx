import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login'
import api from '../configs/api'
import { login, setLoading } from '../app/features/authSlice'

export default function Layout() {

  const dispatch = useDispatch()

  const { user, loading } = useSelector(state => state.auth)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get('/api/users/data')

        dispatch(login({
          user: data.user
        }))
      }
      catch (error) {
        // Cookie missing or invalid
      }
      finally {
        dispatch(setLoading(false))
      }
    }

    loadUser()
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  return (
    <div>
      {user ? (
        <div className='min-h-screen bg-gray-50'>
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}