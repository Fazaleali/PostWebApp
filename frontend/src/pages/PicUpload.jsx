import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PicUpload() {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState(null);

    const handlePic = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('pic', formdata);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/profile');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleChange = (e) => {
        setFormdata(e.target.files[0]); // Get the file from input
    };

    return (
        <div className='w-full min-h-screen bg-zinc-900 text-white p-10'>
            <div className='flex mb-3 justify-end'>
                <div className='flex gap-4 items-center'>
                    <Link to='/profile'><a className='text-blue-500 text-md'>Back to Profile</a></Link>
                </div>
            </div>
            <h5 className='mb-5 mt-3'>Upload Profile Picture</h5>
            <form onSubmit={handlePic} encType='multipart/form-data'>
                <input type="file" name="pic" onChange={handleChange} />
                <input type="submit" value="Upload" className="block bg-blue-500 px-3 py-2 rounded-md w-32 cursor-pointer text-sm mt-2" />
            </form>
        </div>
    );
}

export default PicUpload;
