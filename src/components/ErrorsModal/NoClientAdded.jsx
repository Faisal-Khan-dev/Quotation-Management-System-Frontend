import React from 'react'
import AddedErr from "../../assets/AddedErr.png"

const NoClientAdded = () => {
    return (
        <div className='w-full h-[70vh] flex justify-center items-center'>
        <div className='max-w-[400px] w-full h-[200px] gap-3 flex flex-col items-center justify-center'>
            <div>
                <img src={AddedErr} alt="addedError" />
            </div>
            <h2 className='text-center font-bold text-lg'>Welcome! <br /> No Clients Added Yet</h2>
            <p className='text-lg '>Start managing your quotations by adding your first client. Once added, they will appear here</p>
        </div>
         </div>
    )
}

export default NoClientAdded