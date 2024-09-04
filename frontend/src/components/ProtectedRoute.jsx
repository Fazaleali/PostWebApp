import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/check', {
                    withCredentials: true,
                });
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/login')
                }
            } catch (error) {
                console.error('Authentication check failed:', error);
                setIsAuthenticated(false);
                navigate('/login')
            }
        };
    
        checkAuth();
    }, [navigate]);    

    if (isAuthenticated === null) {
        return <div className='relative w-full min-h-screen bg-zinc-900 text-white p-10'>
        <img
            src="https://cdn.pixabay.com/animation/2023/08/11/21/18/21-18-05-265_512.gif"
            width={50}
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            alt="Loading.."
        />
    </div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}

export default ProtectedRoute;