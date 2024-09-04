import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='w-full flex flex-col justify-center min-h-screen bg-zinc-900 text-white p-10'>
      <div className="flex justify-between mb-4">
        <h3 className='text-2xl text-zinc-400'>Login</h3>
        <Link to={'/'}><a className='text-blue-500 text-md'>Back to Home</a></Link>
      </div>
    <LoginForm/>
    </div>
  )
}

export default LoginPage