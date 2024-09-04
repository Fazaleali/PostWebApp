import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

function UpdatePost() {
    const location = useLocation()
    const post = location.state?.post

    const [formUpdate, setformUpdate] = useState({
        updatecontent:''
    })

    const handlechange = (e)=>{
        const {name, value} = e.target
        setformUpdate({...formUpdate, [name]: value})
    }

    useEffect(() => {
        if (post) {
            setformUpdate({ updatecontent: post.content });
        }
        else{
            navigate('/profile')
        }
    }, [post]);

    const navigate = useNavigate()

    const handleSubmission = async (e)=>{
        e.preventDefault()
        const response = await axios.post(`http://localhost:3000/update/${post._id}`, formUpdate, {
            withCredentials: true
        })
        navigate('/profile')
    }
  return (
    <>
        <div className='w-full min-h-screen bg-zinc-900 text-white p-10'>
            <div className='flex mb-3 justify-between'>
                <h3 className='text-3xl'>Update Post</h3>
                <Link to={'/profile'}><a className='text-blue-500 text-md'>Back to Profile</a></Link>
            </div>
            <h5 className='mb-5'>Update your post</h5>
            <form onSubmit={handleSubmission}>
                <textarea placeholder='Update your Post..' className='w-1/3 resize-none bg-transparent border-2 p-3 border-zinc-800 outline-none rounded-md block' name="updatecontent" value={formUpdate.updatecontent} onChange={handlechange}></textarea>
                <input type="submit" value="Update Post" className="block bg-yellow-500 px-3 py-2 rounded-md w-32 cursor-pointer text-sm mt-2" />
            </form>
        </div>
        </>
  )
}

export default UpdatePost