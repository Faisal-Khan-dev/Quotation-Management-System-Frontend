import React from 'react'
import Img1 from "../../assets/AccessDenied.png"

const PermissionDenied = ({ onClose }) => {

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}   // 👉 Click outside = close modal
        >
            <div 
                className='max-w-[650px] w-full bg-white rounded-[8px] h-[300px] flex flex-col gap-4 items-center justify-center p-5'
                onClick={(e) => e.stopPropagation()}  // 👉 Click inside = NOT close
            >
                <img src={Img1} alt="" />
                <h2 className='font-bold text-black text-2xl '>Permission Denied</h2>
                <p className='text-[#00000099] text-center'>
                    You don't have the nescesary permissions performe action. <br />
                    Please conntact your system administrator for assistance
                </p>
                <div className='flex flex-row items-center justify-center gap-3'>
                    <button 
                        onClick={onClose} 
                        className='text-base bg-black text-white rounded-[8px] cursor-pointer py-2 px-[67px]'
                    >
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={onClose} 
                        className='text-base bg-white text-black border-2 border-black rounded-[8px] cursor-pointer py-2 px-[67px]'
                    >
                        Contact Support
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PermissionDenied;
