import { Tooltip } from 'flowbite-react'
import { AiOutlineBell, AiFillBell } from 'react-icons/ai'
import { useRef, useState } from 'react'
import Dropdown from '../Dropdown'
import { useOuterClick } from '../../hook/useOutsideClick'
import { BsBell } from 'react-icons/bs'

const Notification = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const childRef = useRef<HTMLDivElement>(null)

  useOuterClick(childRef.current, () => {
    setIsShow(false)
  })

  return (
    <Tooltip content='Thông báo' animation='duration-1000'>
      <div
        className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer relative sm:w-10 sm:h-10'
        onClick={() => setIsShow(!isShow)}
        ref={childRef}
      >
        {isShow ? (
          <AiFillBell className='w-5 h-5 text-white pointer-events-none sm:w-6 sm:h-6' />
        ) : (
          <AiOutlineBell className='w-5 h-5 text-white pointer-events-none sm:h-6 sm:w-6' />
        )}

        {isShow && (
          <>
            {' '}
            <Dropdown className='w-[230px] h-[320px] bg-[#282828] right-0 sm:w-[300px] sm:h-[350px]'>
              <div className=' flex flex-col justify-between h-full'>
                <div className='flex flex-col'>
                  <span className='text-white text-sm font-medium px-3 py-3'>Thông báo</span>
                  <span className='border w-full border-[#535353]'></span>
                </div>
                <div className='flex flex-col items-center pb-16'>
                  <BsBell className='text-[#717171] w-16 h-16' />
                  <span className='text-[#AAAAAA] text-sm font-semibold py-5'>Thông báo của bạn hiển thị ở đây</span>
                  <span className='text-[#AAAAAA] text-xs font-medium'>Đăng ký kênh yêu thích của bạn để nhận</span>
                  <span className='text-[#AAAAAA] text-xs font-medium'>thông báo về các video mới nhất</span>
                </div>
              </div>
            </Dropdown>
          </>
        )}
      </div>
    </Tooltip>
  )
}

export default Notification
