import React from 'react'
import LeftPart from '../components/Login/LeftPart'
import RightPart from '../components/Login/RightPart'

const Login = () => {
  return (
    <div>
        <div className=' flex flex-col md:flex-row min-w-[100vh] min-h-[100vh]'>
            <LeftPart/>
            <RightPart/>
        </div>
    </div>
  )
}

export default Login