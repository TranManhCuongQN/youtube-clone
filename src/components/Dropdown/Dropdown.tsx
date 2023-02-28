import { Link } from 'react-router-dom'
import { RiHistoryLine } from 'react-icons/ri'
import { RefObject } from 'react'

interface DropdownProps {
  className?: string
  data?: Array<{ id: number; name: string; path?: string; icon?: JSX.Element }>
  search?: boolean
  createVideo?: boolean
  path?: string
}
const Dropdown = (props: DropdownProps) => {
  const { className, data, search, createVideo } = props

  return (
    <div className={`absolute top-[52px] left-0 rounded-2xl z-50 shadow-xl ${className} `}>
      {data?.map((item, index) => (
        <div key={item.id}>
          {search && (
            <Link to='/' key={item.id} className='flex flex-col px-5 py-2 mt-3 hover:bg-gray-100'>
              <div className='flex items-center justify-between'>
                <div className='flex items-end gap-x-5'>
                  <RiHistoryLine className='w-7 h-7' />
                  <span className='text-lg font-medium'>{item.name}</span>
                </div>
                <span className='text-blue-700  text-base hover:underline'>Xoá</span>
              </div>
            </Link>
          )}
          {createVideo && (
            <Link to={item.path as string} key={item.id} className='flex flex-col hover:bg-blue-400 mt-3'>
              <div className='flex items-center justify-center gap-3 py-1'>
                {item.icon}
                <span className='text-lg font-medium'>{item.name}</span>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default Dropdown
