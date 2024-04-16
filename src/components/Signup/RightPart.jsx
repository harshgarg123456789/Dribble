import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { signUp } from '../../services/operations/authAPI'
import { setSignupData } from '../../slices/authSlice'

const RightPart = () => {
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
      } = useForm()

    const gotoSignIn=()=>{
        navigate('/login')
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
          reset({
            name: "",
            username: "",
            email: "",
            password: "",
            tc: "",
          })
        }
      }, [reset, isSubmitSuccessful])

    const submitContactForm=(data)=>{
        dispatch(setSignupData(data))
        console.log("after setting signup data",data)
        dispatch(signUp(data,navigate))
    }

  return (
    <div className='w-[100%] md:w-[70%] my-auto'>
        <div className='flex font-semibold justify-end mr-5 mt-4 gap-1'>
            <p>Already a member?</p>
            <p className='text-blue-700 cursor-pointer' onClick={gotoSignIn}>Sign In</p>
        </div>
        <div className='w-8/12 md:w-6/12 mx-auto flex flex-col gap-5'>
            <h2 className='text-2xl font-bold'>Sign up to Dribble</h2>

            <form
                className='flex flex-col gap-9'
                onSubmit={handleSubmit(submitContactForm)}
                >
                <div className='flex gap-4 w-[100%]'>
                    <div className='flex flex-col gap-1 w-[48%]' >
                        <label htmlFor="name" className='font-bold'>
                            Name
                        </label> 
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className=' bg-gray-100 px-3 py-2 rounded-md'
                            placeholder="Enter your name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <span className='text-red-500 text-sm flex items-center gap-1' >
                                <div className='bg-red-500 rounded-full h-2 w-2'></div>
                            Please enter your name.
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-1 w-[48%]' >
                        <label htmlFor="username" className='font-bold'>
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className=' bg-gray-100 px-3 py-2 rounded-md'
                            placeholder="Enter username"
                            
                            {...register("username", { required: true })}
                        />
                        {errors.username && (
                            <span className='text-red-500 text-sm flex items-center gap-1' >
                            <div className='bg-red-500 rounded-full h-2 w-2'></div>
                            Please enter username.
                            </span>
                            )}
                    </div>
                </div>

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

                <div className='flex flex-col gap-1'>
                    <div className='flex gap-3 items-center'>
                        <input
                        className='h-8 w-8 accent-rose-500 focus:accent-rose-300'
                        type='checkbox'
                        name="tc"
                        id="tc"
                        {...register("tc", { required: true })}
                        />
                        <label htmlFor="tc" className='text-md'>
                        <p>Creating an account means you're okay with our <span className='text-blue-700'>Terms of Service, Privacy Policy,</span> and our default <span className='text-blue-700'>Notification Settings.</span></p>
                        </label>
                    </div>
                        {errors.tc && (
                        <span className='text-red-500 text-sm flex items-center gap-1' >
                        <div className='bg-red-500 rounded-full h-2 w-2'></div>
                            Please accept the condition to continue.
                        </span>
                        )}
                </div>

                <button
                    disabled={loading}
                    type="submit"
                    className='bg-pink-500 rounded-md text-white font-semibold w-[40%] md:w-[50%] lg:w-[40%] p-2'
                >
                    Create Account
                </button>
            </form>
            
            <p className='w-[60%] text-gray-500 text-sm pb-5'>This site is protected by reCAPTCHA and the Google <span className='text-blue-700'>Privacy Policy</span> and <span className='text-blue-700'>Terms of Service</span></p>
        </div>
    </div>
  )
}

export default RightPart