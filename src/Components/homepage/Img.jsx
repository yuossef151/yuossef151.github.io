import React from 'react'

export default function Img() {
  return (
    <>
              <div className=" w-full lg:h-200 h-100 inset-0">
          <img
            className=" object-cover w-full h-full rotate-180   top-0 "
            src="/imglogin.png"
            alt=""
          />
          <div className="absolute w-full lg:h-200 h-100 inset-0 bg-[#00000099] flex  justify-center ">
<div className='text-white  h-full pt-40 flex flex-col items-center gap-10 justify-center text-center'>
  <p className='lg:text-[40px] text-[30px] font-bold'>Welcome to Book Haven</p>
  <p className='text-[16px] lg:text-[20px]'>Browse curated collections, discover new authors, and enjoy a seamless reading experience.</p>
</div>
          </div>
        </div>
    </>
  )
}
