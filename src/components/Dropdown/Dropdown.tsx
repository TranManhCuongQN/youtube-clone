import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { RiHistoryLine } from 'react-icons/ri'

interface DropdownProps {
  className?: string
  data?: Array<{ id: number; name: string }>
  search?: boolean
}
const Dropdown = (props: DropdownProps) => {
  const { className, data, search } = props

  return (
    <div className={`absolute top-[52px] left-0 rounded-2xl z-50 shadow-xl ${className} `}>
      {data?.map((item, index) => (
        <NavLink to='/' key={item.id} className='flex flex-col px-5 py-2 mt-3 hover:bg-gray-100'>
          {search && (
            <div className='flex items-center justify-between'>
              <div className='flex items-end gap-x-5'>
                <RiHistoryLine className='w-7 h-7' />
                <span className='text-lg font-medium'>{item.name}</span>
              </div>
              <span className='text-blue-700  text-base hover:underline'>Xoá</span>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  )
}

export default Dropdown
