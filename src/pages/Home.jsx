import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate=useNavigate()
  return (
    <div className='flex flex-col justify-center h-[100vh] w-[100vw]'>
        <h1 className='font-extrabold font-serif text-center text-5xl sm:text-7xl w-[95%] sm:w-[90%] mx-auto text-pink-400'>Welcome To Dribble</h1>
    </div>
  )
}

export default Home