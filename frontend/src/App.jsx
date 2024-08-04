
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './Store/authUser'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import Watch from './Pages/Watch'
import Search from './Pages/Search'
import History from './Pages/History'
import NotFound from './Pages/NotFound'

function App() {
  const {user,isCheckingAuth,authcheck}=useAuthStore()

  useEffect(()=>{
authcheck()
  },[authcheck])
  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className='animate-spin text-red-600 size-10'/>
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={!user?<Login/> : <Navigate to={'/'}/>}/>
      <Route path='/signup' element={!user?<Signup/>: <Navigate to={'/'}/>}/>
      <Route path='/watch/:id' element={user?<Watch/>: <Navigate to={'/login'}/>}/>
      <Route path='/search' element={user?<Search/>: <Navigate to={'/login'}/>}/>
      <Route path='/history' element={user?<History/>: <Navigate to={'/login'}/>}/>
      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App
