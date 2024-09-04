import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Profile() {
    const API = 'http://localhost:3000';
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formdata, setformdata] = useState({
        content: ''
    })
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


    const logout = async () => {
        try {
            localStorage.removeItem('token');
            await axios.get(`${API}/auth/logout`, { withCredentials: true });
            setPosts([])
            setProfile(null)
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${API}/auth/profile`,{
                    withCredentials: true
                });
                setProfile(response.data);

                const PostsResponse = await axios.get(`${API}/posts`,{
                    withCredentials: true
                })
                setPosts(PostsResponse.data.posts)
            } catch (error) {
                setError('Error fetching profile');
                navigate('/register')
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div className='relative w-full min-h-screen bg-zinc-900 text-white p-10'>
        <img
            src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
            width={50}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            alt="Loading.."
        />
    </div>
    
    }

    if (error) {
        return <p>{error}</p>;
    }

    const handlechange = (e)=>{
        const {name, value} = e.target
        setformdata({...formdata, [name]: value})
    }

    const CreatePost = async (e)=>{
        e.preventDefault()
        let response = await axios.post(`${API}/create/post`, formdata, {
            withCredentials: true
        })
        setPosts([...posts, response.data]);
        setformdata({ content: '' });
    }

    const handleLike = async (postid)=>{
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postid
                    ? {
                        ...post,
                        likes: post.likes.includes(profile._id)
                            ? post.likes.filter((like) => like !== profile._id)
                            : [...post.likes, profile._id],
                    }
                    : post
            )
        );
        let response = await axios.get(`${API}/like/${postid}`,{
            withCredentials: true
        })
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postid ? response.data : post
            )
        );
    }

    const handleEdit = async (postid)=>{
        const response = await axios.get(`${API}/edit/${postid}`,{
            withCredentials: true
        })
        navigate('/update', {state:{post: response.data}})
    }

    const uploadpic = ()=>{
        navigate('/picupload')
    }

    return (
        <>
        <div className='w-full min-h-screen bg-zinc-900 text-white p-10'>
            <div className='flex mb-3 justify-end'>
                <div className='flex gap-4 items-center'>
                <Link to={'/'}><a className='text-blue-500 text-md'>Back to Home</a></Link>
                <button onClick={logout} className='bg-red-500 px-3 py-2 rounded-md'>Logout</button>
                </div>
            </div>
            <div className='flex items-start gap-4'>
                <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img className='w-full h-full cursor-pointer object-cover' src= {`${API}/images/uploads/${profile.profilepic}`} alt="Profile" onClick={uploadpic} />
                </div>
                <h3 className='text-3xl'>Hello, <span className='font-semibold capitalize'>{profile ? profile.name : 'Guest'}</span></h3>
                </div>
            <h5 className='mb-5 mt-3'>You can create a New Post.</h5>
            <form onSubmit={CreatePost}>
                <textarea placeholder='Write your thoughts..' required className='w-1/3 resize-none bg-transparent border-2 p-3 border-zinc-800 outline-none rounded-md block' name="content" value={formdata.content} onChange={handlechange} ></textarea>
                <input type="submit" value="Create Post" className="block bg-blue-500 px-3 py-2 rounded-md w-32 cursor-pointer text-sm mt-2" />
            </form>
            <div className='posts mt-14'>
                <h3 className='text-zinc-400'>Your Posts.</h3>
                <div className="postcontiner mt-5">
                    {posts.length > 0 ?
                        [...posts].reverse().map((post,key)=>{
                            return(
                                <div key={key} className='post mb-4 w-1/3 border-[1px] border-zinc-700 bg-zinc-800 rounded-md p-4'>
                        <h4 className='text-blue-500 mb-2'>@{profile.username}</h4>
                        <p className='text-sm tracking-tight'>{post.content}</p>
                        <small className="mt-2 inlince-block">{post.likes.length}</small>
                        <div className="btns mt-1 flex gap-4">
                            <a onClick={()=>handleLike(post._id)} className='text-blue-500 cursor-pointer'>{post.likes.includes(profile._id) ? 'Unlike' : 'Like'}</a>
                            <a onClick={()=>handleEdit(post._id)} className='text-zinc-600 cursor-pointer'>Edit</a>
                        </div>
                        </div>
                            )
                        })
                        : <p className='text-sm text-zinc-500'>No Posts Yet..</p>
                    }
                </div>
            </div>
        </div>
        </>
    );
}

export default Profile;
