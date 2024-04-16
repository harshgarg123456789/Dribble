import React, { useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import {HiMail} from 'react-icons/hi'
import {FaCheckCircle} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { resendmail } from '../services/operations/authAPI'
import { getUserDetails } from '../services/operations/profileAPI'
import { useNavigate } from 'react-router-dom'


const VerifyEmail = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  
  const resendmailHandler=()=>{
    dispatch(resendmail(token))
  }

  useEffect(()=>{
    dispatch(getUserDetails(token,user))
  },[])
  
  return (
    <div className='min-w-[100vw] '>
        <Navbar/>
        <div className='w-7/12 mx-auto mt-12 sm:my-24 gap-4 text-gray-500 text-sm font-semibold  flex flex-col items-center'>
          <h2 className='text-2xl font-bold text-black text-center'>Please verify your email...</h2>
          <div className='relative'>
            <p className='text-8xl text-stone-300 '><HiMail /></p>
            <p className='absolute top-3 -right-1 text-2xl border-4 border-white rounded-full text-pink-500 '><FaCheckCircle /></p>
          </div>
          <p className='text-center'>Please verify your email address. We have sent a confirmation email to:</p>
          <p className='sm:font-bold font-semibold text-black'>{user?.email}</p>
          <p className='text-center'>Click the confirmation link in that email to begin using Dribble.</p>
          <p className='w-[65%] text-center'>Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can <span onClick={resendmailHandler} className='text-pink-600 cursor-pointer'>resend the confirmation email.</span></p>
          <p className='text-center'>Wrong email address? <span className='text-pink-600 cursor-pointer' onClick={()=>navigate('/changemail')}>Change it.</span> </p>
        </div>
        <Footer/>
    </div>
  )
}

export default VerifyEmail