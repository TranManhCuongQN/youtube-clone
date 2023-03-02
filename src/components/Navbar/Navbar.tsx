import { Tooltip } from 'flowbite-react'
import React, { useState } from 'react'
import { BsYoutube } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import CreateVideo from '../CreateVideo'
import Notification from '../Notification'
import ProfileUser from '../ProfileUser'
import SearchBar from '../SearchBar'
const Navbar = () => {
  const [searchMobie, setSearchMobie] = useState<boolean>(false)

  const handleSwitchMobie = () => {
    setSearchMobie(!searchMobie)
  }

  return (
    <>
      {searchMobie ? (
        <SearchBar searchMobie={searchMobie} handleSwitchMobie={handleSwitchMobie} />
      ) : (
        <div className='flex items-center justify-between h-15 bg-[#0f0f0f] sticky z-50 max-w-full px-2 py-2'>
          <div className='flex items-center'>
            <div className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='w-5 h-5'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
              </svg>
            </div>

            <Tooltip content='Trang chủ YouTube' animation='duration-1000'>
              <Link to='/' className='flex items-center cursor-pointer gap-x-1'>
                <BsYoutube className='text-red-600 w-6 h-6' />
                <span className='text-base text-white font-medium '>YouTube</span>
              </Link>
            </Tooltip>
          </div>
          <div className='flex items-center'>
            <SearchBar searchMobie={searchMobie} handleSwitchMobie={handleSwitchMobie} />
            <CreateVideo />
            <Notification />
            <ProfileUser />
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
