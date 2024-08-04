import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../Store/authUser'

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const {login}=useAuthStore()
  const handleSignup = (e) => {
    e.preventDefault()
login({email,password})    
}
  return (
    <div className="hero-bg w-full h-dvh ">
    <header className="max-w-6xl mx-auto flex items-center justify-between p-5">
      <Link to={"/"}>
        <img src="/netflix-logo.png" alt="" className="w-52" />
      </Link>
    </header>
    <div className="flex justify-center items-center mt-20 mx-3">
      <div className="w-full max-w-md rounded-lg p-8 bg-black/60">
        <h1 className="text-white text-center text-3xl font-bold mb-4">
          Login
        </h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300 block"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full text-white px-3 py-2 mt-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring "
              placeholder="Enter your Email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          {/* <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-300 block"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full px-3 text-white py-2 mt-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring"
              placeholder="Enter your Username"
              id="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
          </div> */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300 block"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full px-3 text-white py-2 mt-1 border border-gray-700 bg-transparent rounded-md focus:outline-none focus:ring"
              placeholder="Enter your Password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="bg-red-600 mt-2 text-white font-semibold text-xl w-full rounded-md p-2.5 hover:bg-red-700">Login</button>
          </div>
        </form>
        <div className="text-center text-base text-gray-300 mt-3">
          Don't have an account? <Link className="text-red-600 hover:underline" to={"/signup"}>Sign Up</Link>
        </div>
      </div>
    </div>
  </div>  )
}

export default Login