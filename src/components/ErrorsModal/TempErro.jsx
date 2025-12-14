import React from 'react'
import TempErrImg from "../../assets/TempError.png"

const TempErro = () => {
  return (
      <div className='w-full h-screen flex justify-center items-center'>
    <div className='flex flex-col gap-3 items-center justify-center '>
      <img src={TempErrImg} alt="" className='w-[140px]' />
      <h2 className='font-bold text-[40px]'>TEMPLATE MISSING</h2>
      <p>The requested template could not be found.</p>
      <button className='text-base bg-black text-white rounded-[8px] cursor-pointer py-2 px-[67px]'>
        Go Back
      </button>
    </div>
    </div>
  )
}

export default TempErro
