import React from 'react'
import LeftPart from '../components/Signup/LeftPart'
import RightPart from '../components/Signup/RightPart'

const SignUp = () => {
  return (
    <div>
        <div className=' flex flex-col md:flex-row min-w-[100vh] min-h-[100vh]'>
            <LeftPart/>
            <RightPart/>
        </div>
    </div>
  )
}

export default SignUp