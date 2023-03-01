import { Link } from 'react-router-dom'
import { RiHistoryLine } from 'react-icons/ri'
import { BsBell } from 'react-icons/bs'

interface DropdownProps {
  className?: string
  data?: Array<{ id: number; name: string; path?: string; icon?: JSX.Element }>
  search?: boolean
  createVideo?: boolean
  notification?: boolean
  path?: string
}
const Dropdown = (props: DropdownProps) => {
  const { className, data, search, createVideo, notification } = props

  return (
    <div className={`absolute top-[52px]  rounded-2xl z-50 shadow-xl ${className} `}>
      <>
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
              <Link
                to={item.path as string}
                key={item.id}
                className='flex flex-col hover:bg-[rgba(190,190,190,0.3)] mt-3'
              >
                <div className='flex items-center justify-center gap-3 py-1'>
                  {item.icon}
                  <span className='text-lg font-medium'>{item.name}</span>
                </div>
              </Link>
            )}
          </div>
        ))}

        {notification && (
          <div className=' flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <span className='text-white text-base font-medium px-5 py-5'>Thông báo</span>
              <span className='border-2 w-full border-[#535353]'></span>
            </div>
            <div className='flex flex-col items-center pb-28'>
              <BsBell className='text-[#717171] w-24 h-24' />
              <span className='text-[#AAAAAA] text-xl font-semibold py-5'>Thông báo của bạn hiển thị ở đây</span>
              <span className='text-[#AAAAAA] text-base font-medium'>Đăng ký kênh yêu thích của bạn để nhận</span>
              <span className='text-[#AAAAAA] text-base font-medium'>thông báo về các video mới nhất</span>
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default Dropdown
