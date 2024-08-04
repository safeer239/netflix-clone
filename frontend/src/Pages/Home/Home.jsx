import React from 'react'
import HomeScreen from './HomeScreen'
import AuthScreen from './AuthScreen'
import { useAuthStore } from '../../Store/authUser'

const Home = () => {
  const {user}=useAuthStore()
  return (
    <>{user?<HomeScreen/>:<AuthScreen/>}</>
  )
}

export default Home