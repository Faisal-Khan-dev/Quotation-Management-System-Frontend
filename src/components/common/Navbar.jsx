import { BellDot, Search } from 'lucide-react'
import React from 'react'
import logo from '../../assets/images/logo.png'

const Navbar = () => {
  return (
    <div>
      {/* nav */}
      <div className="h-[45px] flex justify-between items-center">
            {/* haeding div */}
            <div>
              <h1 className="text-[32px] font-bold">My Quotation History,</h1>
            </div>
            {/* right content div */}
            <div className="space-x-4 flex">
              {/* search bar */}
              <div className="h-[36px] w-[360px] py-[10px] px-[13px] bg-[#FBFAFA] rounded-[8px] border border-[#00000014] flex gap-1">
                <span>
                  <Search className="h-[16px] w-[16px]" />
                </span>
                <input type="text" placeholder="Search..." className="outline-none"/>
              </div>

              {/* bell icon */}
              <div className="h-[36px] w-[36px] rounded-[8px] bg-[#FBFAFA] border border-[#00000014] flex justify-center items-center">
                <BellDot className="h-[15px] w-[15px]" />
              </div>

              {/* profile info */}
              <div className="space-x-[6px] flex">
                <div className="w-[36px] h-[36px] rounded-[50%] p-[2px] border">
                  <img
                    src={logo}
                    alt="profile img "
                    className="w-full h-full rounded-[50%]"
                  />
                </div>
                <div>
                  <p className="h-5 text-[14px]">Brown Martin</p>
                  <p className="text-[#00000099] font-[400] text-[10px]">
                    Owner
                  </p>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Navbar
