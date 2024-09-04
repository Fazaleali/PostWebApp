import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function LoginForm() {

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [error, seterror] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    const {name,value} = e.target
    setFormData(prevState => ({...prevState, [name]:value}))
  }

  const handlesubmission = async (e)=>{
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:3000/auth/login', formData, { 
        withCredentials: true 
    });
      navigate('/profile',)
    }
    catch{
      navigate('/login')
      seterror(true)
    }
  }
  return (
    <>
    <div className="w-full flex flex-col gap-2 justify-center max-w-sm m-auto rounded-lg backdrop-blur-md bg-black/90 drop-shadow-2xl">

        <h3 className='p-4 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent text-xl flex justify-center font-bold'>Login to your Account</h3>

    <form onSubmit={handlesubmission} className="shadow-md rounded px-8 pb-8 mb-4 text-white">

    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Email
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 px-3 bg-transparent border-2 border-zinc-700 leading-tight focus:outline-none focus:shadow-outline" value={formData.email} type="email" name="email" onChange={handleChange} placeholder="example@gmail.com"/>
    </div>


    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Password
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 bg-transparent border-2 border-zinc-700 px-3 leading-tight outline-none" value={formData.password} type="password" onChange={handleChange} name="password" placeholder="***********"/>
    </div>

    <div className="mb-4 flex justify-center">
      <span className={`text-red-600 text-sm tracking-light ${error ? 'block' : 'hidden'}`}>Email or password is not correct</span>
    </div>

    <div className="flex flex-col items-center justify-center">
      <input className="bg-gradient-to-r from-pink-500 to-violet-500 outline-none cursor-pointer text-white font-bold py-2 px-4 rounded-md w-full mt-2" type="submit" value="Login"/>
      <p className='mt-2'>Don't have account? <Link to={'/register'}><a className='text-blue-500 text-sm' href="">Register</a></Link></p>
    </div>
  </form>
</div>
    </>
  )
}

export default LoginForm