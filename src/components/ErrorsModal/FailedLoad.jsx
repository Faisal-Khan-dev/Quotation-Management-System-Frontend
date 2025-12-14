import React from 'react'
import Img1 from "../assets/loadError.png"

const FailedLoad = ({ onClose }) => {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className='max-w-[850px] w-full bg-white rounded-[8px] h-[500px] flex flex-col gap-3 items-center justify-center p-5'>
                <img src={Img1} alt="" />
                <h2 className='font-bold text-black text-2xl '>Oops! Client Data Failed to Load</h2>
                <p className='text-[#00000099] text-center'>
                    There was a problem connecting to the server. Please check your internet connection.<br />
                    Error Code: 503
                </p>
                <button onClick={onClose} className='text-base bg-black text-white rounded-[8px] cursor-pointer py-2 px-[67px]'>
                    Go to Dashboard
                </button>
            </div>
        </div>
    )
}

export default FailedLoad
