import React from 'react'
import ErrorImg from "../../assets/AccessErr.png"

const AccessError = () => {
    return (
          <div className='w-full h-screen flex justify-center items-center'>
        <div className='flex flex-col gap-3 items-center justify-center'>
            <img src={ErrorImg} alt="" className='w-[140px]' />
            <h2 className='font-bold text-[40px]'>ACCESS DENIED</h2>
            <p className='text-xl font-medium'>You do not have permission to access this page.</p>
            <button className='text-base bg-black text-white rounded-[8px] cursor-pointer py-2 px-[67px]'>
                Go Back
            </button>
        </div>
        </div>
    )
}

export default AccessError