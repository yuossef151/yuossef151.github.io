import React from 'react'

export default function Img() {
  return (
    <>
              <div className=" w-full lg:h-200 h-100 inset-0">
          <img
            className=" object-cover w-full h-full rotate-180   top-0 "
            src="./public/imglogin.png"
            alt=""
          />
          {/* bg-[#D9176C] */}
          <div className="absolute w-full lg:h-200 h-100 inset-0 bg-[#00000099] flex items-center justify-center ">
            <div className='lg:w-133.75 md:w-100 w-70  rounded-[50px] relative overflow-hidden'>
            <input className='bg-white lg:py-4 md:py-4 py-3 lg:px-6 px-3 lg:w-111 md:w-100 w-70 text-[13px] md:text-[15px] lg:text-[18px] rounded-l-2xl h-full   focus:border-none focus:outline-none ' type="search" placeholder='Search'/>
            <div className='lg:w-26.25 w-20 bg-[linear-gradient(to_right,#fff_37%,#D9176C_37%)]  absolute right-0 top-0 h-full flex items-center justify-between md:pe-5 lg:pe-6 pe-4 '>
                          <svg xmlns="http://www.w3.org/2000/svg" className=' text-[#22222280] lg:w-6 w-5 lg:h-6 h-5'  viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="M16 6.429C16 4.535 14.21 3 12 3S8 4.535 8 6.429v5.142C8 13.465 9.79 15 12 15s4-1.535 4-3.429z"></path><path d="M5 11a7 7 0 1 0 14 0m-7 7v3m-4 0h8"></path></g></svg>
              <svg xmlns="http://www.w3.org/2000/svg" className='text-white lg:w-6 w-5 lg:h-6 h-5'  viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"></path></svg>
            </div>
            

            </div>
          </div>
        </div>
    </>
  )
}
