import { Tooltip } from 'flowbite-react'
import React from 'react'
import { BsYoutube } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CreateVideo from '../CreateVideo'
import Notification from '../Notification'
import ProfileUser from '../ProfileUser'
import SearchBar from '../SearchBar'
const Navbar = () => {
  return (
    <>
      <div className='flex items-center justify-between h-20 bg-[#0f0f0f] sticky z-50 px-5 w-full'>
        <div className='flex items-center gap-x-6'>
          <div className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='white'
              className='w-8 h-8 '
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
            </svg>
          </div>
          <Tooltip content='Trang chủ YouTube' animation='duration-1000'>
            <Link to='/' className='flex items-center cursor-pointer'>
              <BsYoutube className='text-red-600 w-12 h-8' />
              <span className='text-2xl text-white font-medium pb-1'>YouTube</span>
            </Link>
          </Tooltip>
        </div>
        <SearchBar />
        <div className='flex items-center gap-x-8'>
          <CreateVideo />
          <Notification />
          <ProfileUser />
        </div>
      </div>
    </>
  )
}

export default Navbar
