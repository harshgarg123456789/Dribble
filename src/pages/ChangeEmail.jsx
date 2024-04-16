import React from 'react'
import LeftPart from '../components/ChangeEmail/LeftPart'
import RightPart from '../components/ChangeEmail/RightPart'

const ChangeEmail = () => {
    return (
        <div>
            <div className=' flex flex-col md:flex-row min-w-[100vh] min-h-[100vh]'>
            <LeftPart/>
            <RightPart/>
        </div>
        </div>
      )
}

export default ChangeEmail