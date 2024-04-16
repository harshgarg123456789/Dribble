import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { changeMail } from '../../services/operations/authAPI'

const RightPart = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const { token } = useSelector((state) => state.auth)

  const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitSuccessful },
    } = useForm()

  useEffect(() => {
      if (isSubmitSuccessful) {
        reset({
          email: "",
          password: "",
        })
      }
    }, [reset, isSubmitSuccessful])

  const submitHandler=(data)=>{
      const {email,password}=data
      dispatch(changeMail(email, password,token, navigate))
  }

  return (
    <div className='w-[100%] md:w-[70%] mt-4 md:my-auto'>
        <div className='w-8/12 md:w-6/12 mx-auto flex flex-col gap-5'>
            <h2 className='text-2xl font-bold'>Change Your Email</h2>

            <form
                className='flex flex-col gap-9'
                onSubmit={handleSubmit(submitHandler)}
                >
      
                <div className='flex flex-col gap-1'>
                    <label htmlFor="email" className='font-bold'>
                    Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    className=' bg-gray-100 px-3 py-2 rounded-md'
                    placeholder="Enter your email"
                    {...register("email", { required: true })}
                    />
                    {errors.email && (
                    <span className='text-red-500 text-sm flex items-center gap-1' >
                    <div className='bg-red-500 rounded-full h-2 w-2'></div>
                        Please enter your email.
                    </span>
                    )}
                </div>

                <div className='flex flex-col gap-1'>
                    <label htmlFor="password" className='font-bold'>
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    id="password"
                    className=' bg-gray-100 px-3 py-2 rounded-md'
                    placeholder="Enter your password"
                    {...register("password", { required: true })}
                    />
                    {errors.password && (
                    <span className='text-red-500 text-sm flex items-center gap-1' >
                    <div className='bg-red-500 rounded-full h-2 w-2'></div>
                        Please enter your password.
                    </span>
                    )}
                </div>

                <button
                    type="submit"
                    className='bg-pink-500 rounded-md text-white font-semibold w-[40%] md:w-[50%] lg:w-[40%] p-2'
                >
                    Continue
                </button>
            </form>
            
            <p className='w-[60%] text-gray-500 text-sm pb-5'>This site is protected by reCAPTCHA and the Google <span className='text-blue-700'>Privacy Policy</span> and <span className='text-blue-700'>Terms of Service</span></p>
        </div>
    </div>
  )
}

export default RightPart