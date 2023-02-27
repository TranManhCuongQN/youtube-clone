import { Tooltip } from 'flowbite-react'
import React from 'react'

const Notification = () => {
  return (
    <Tooltip content='Thông báo' animation='duration-1000'>
      <div className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='white'
          className='w-8 h-8'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
          />
        </svg>
      </div>
    </Tooltip>
  )
}

export default Notification
