import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function SignupForm() {

    const [formData, setformData] =useState({
        name: '',
        email: '',
        password: '',
        age: '',
        username: ''
    })

    const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name, value } = e.target
        setformData(prevState => ({...prevState, [name]: value}))
    }

    const handlesubmission = async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:3000/auth/register', formData, { 
              withCredentials: true 
          });          
          navigate("/profile")
        }catch(error){
            console.log("Something Went Wrong")
        }
    }
  return (
    <>
    <div className="w-full flex flex-col gap-2 justify-center max-w-sm m-auto rounded-lg backdrop-blur-md bg-black/90 drop-shadow-2xl">

        <h3 className='p-4 bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent text-xl flex justify-center font-bold'>Registration Form</h3>

    <form onSubmit={handlesubmission} className="shadow-md rounded px-8 pb-8 mb-4 text-white">

    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Name
      </label>
      <input className="shadow appearance-none rounded w-full py-2 px-3 bg-transparent border-2 border-zinc-700 leading-tight focus:outline-none focus:shadow-outline" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Name"/>
    </div>   
        
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Username
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 px-3 bg-transparent border-2 border-zinc-700 leading-tight focus:outline-none focus:shadow-outline" name="username" type="text" placeholder="Username" value={formData.username} onChange={handleChange}/>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Email
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 px-3 bg-transparent border-2 border-zinc-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange}/>
    </div>


    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Password
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 bg-transparent border-2 border-zinc-700 px-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="***********" value={formData.password} onChange={handleChange}/>
    </div>

    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">
        Age
      </label>
      <input className="shadow appearance-none rounded-md w-full py-2 bg-transparent border-2 border-zinc-700 px-3 leading-tight focus:outline-none focus:shadow-outline" type="number" name="age" placeholder="your-age" value={formData.age} onChange={handleChange}/>
    </div>



    <div className="flex flex-col items-center justify-center">
      <input className="bg-gradient-to-r from-pink-500 to-violet-500 cursor-pointer text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline w-full mt-2" type="submit" value="Create Account"/>
      <p className='mt-2'>Already have account? <Link to={'/login'}><a className='text-blue-500 text-sm' href="">Login</a></Link></p>
    </div>
  </form>
</div>
    </>
  )
}

export default SignupForm