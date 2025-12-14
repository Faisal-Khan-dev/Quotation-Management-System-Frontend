import React from 'react'
import Img1 from "../assets/wentWrong.png"

const WentWrong = () => {
    return (
        <div className='flex flex-col items-center gap-4 max-w-[578px]'>
            <div className='max-w-[140px] h-[140px] w-full'>
                <img src={Img1} alt="" />
            </div>
            <h2 className='font-bold text-[40px]'>Oops! Something went wrong</h2>
            <p className='font-medium text-[#00000099] text-xl text-center '>
                We're ssorry, but a seems there there wars an unexpected issue.
                Please try again later. if the problem persists, contact support
            </p>
            <button className='text-base bg-black text-white rounded-[8px] cursor-pointer py-2 px-[67px]'>Back to Login</button>
        </div>
    )
}

export default WentWrong
