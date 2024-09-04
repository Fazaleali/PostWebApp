import React from 'react'
import SignupForm from '../components/SignupForm'
import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <div className='w-full flex justify-center flex-col min-h-screen bg-zinc-900 text-white p-10'>
      <div className="flex justify-between mb-4">
        <h3 className='text-2xl text-zinc-400'>Registration</h3>
        <Link to={'/'}><a className='text-blue-500 text-md'>Back to Home</a></Link>
      </div>
            <SignupForm/>
    </div>
  )
}

export default SignUpPage