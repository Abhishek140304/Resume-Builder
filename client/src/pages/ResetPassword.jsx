import React from 'react'
import { LockIcon } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../configs/api'
import toast from 'react-hot-toast'

export default function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [formData, setFormData] = React.useState({
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            return toast.error('Passwords do not match')
        }

        try {
            const { data } = await api.post(
                `/api/users/reset-password/${token}`,
                {
                    password: formData.password
                }
            )

            toast.success(data.message)
            navigate('/app')
        }
        catch (error) {
            toast.error(
                error?.response?.data?.message || error.message
            )
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
            >
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">
                    Reset Password
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                    Enter your new password.
                </p>

                <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <LockIcon size={16} color="#6b7280" />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        className="border-none outline-none ring-0 w-full bg-transparent"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <LockIcon size={16} color="#6b7280" />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="border-none outline-none ring-0 w-full bg-transparent"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity cursor-pointer"
                >
                    Reset Password
                </button>

                <p className="text-gray-500 text-sm mt-4 mb-11">
                    Back to{" "}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-green-500 hover:underline cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    )
}