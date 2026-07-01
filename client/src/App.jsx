import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import { Toaster } from 'react-hot-toast'
import ResetPassword from './pages/ResetPassword'


export default function App() {

  const dispatch = useDispatch()

  async function getUserData() {
    try {
      const { data } = await api.get('/api/users/data')

      if (data.user) {
        dispatch(login({
          user: data.user
        }))
      }
    }
    catch (error) {
      // User is not logged in
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    getUserData()
  }, [dispatch])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>

        <Route path='view/:resumeId' element={<Preview />} />

        <Route path="/reset-password/:token" element={<ResetPassword />} />

      </Routes>
    </>
  )

}