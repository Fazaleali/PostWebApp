import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='w-full min-h-screen bg-zinc-900 text-white p-10'>
        <div className='flex mb-3 justify-between'>
                <h3 className='text-3xl'>HomePage</h3>
                <div  className='flex items-center gap-4'>
                <Link to={'/register'}><button className='bg-green-500 px-3 py-2 rounded-md'>Register</button></Link>
                <Link to={'/login'}><button className='bg-blue-500 px-3 py-2 rounded-md'>Login</button></Link>
                <Link to={'/profile'}><button className='bg-yellow-500 px-3 py-2 rounded-md'>Profile</button></Link>
                </div>
            </div>
    </div>
  )
}

export default Home