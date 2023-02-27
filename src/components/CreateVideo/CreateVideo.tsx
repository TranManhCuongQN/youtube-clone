import { Tooltip } from 'flowbite-react'
import React from 'react'
import { BiVideoPlus } from 'react-icons/bi'
const CreateVideo = () => {
  return (
    <>
      <Tooltip content='Tạo' animation='duration-1000'>
        <div className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'>
          <BiVideoPlus className=' w-10 h-8 text-white' />
        </div>
      </Tooltip>
    </>
  )
}

export default CreateVideo
