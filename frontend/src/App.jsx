import React from 'react'
import SignUpPage from './pages/SignUpPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'
import UpdatePost from './pages/UpdatePost'
import PicUpload from './pages/PicUpload'

function App() {
  return (
   <Router>
      <Routes>
        <Route path='/register' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path='/update' element={<ProtectedRoute><UpdatePost/></ProtectedRoute>} />
        <Route path='/picupload' element={<ProtectedRoute><PicUpload/></ProtectedRoute>} />
      </Routes>
   </Router>
  )
}

export default App