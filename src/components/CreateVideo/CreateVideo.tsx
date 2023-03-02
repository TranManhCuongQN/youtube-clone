import { Tooltip } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { RiWirelessChargingFill, RiVideoAddFill, RiVideoAddLine } from 'react-icons/ri'
import Dropdown from '../Dropdown'
import { useOuterClick } from '../../hook/useOutsideClick'
import { Link } from 'react-router-dom'

const data = [
  {
    id: 1,
    name: 'Tải video lên',
    path: '/upload',
    icon: <AiOutlineYoutube className=' w-5 h-5 text-white' />
  },
  {
    id: 2,
    name: 'Phát trực tiếp',
    path: '/livestream',
    icon: <RiWirelessChargingFill className=' w-5 h-5 text-white' />
  }
]

const CreateVideo = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const childRef = useRef<HTMLDivElement>(null)

  useOuterClick(childRef.current, () => {
    setIsShow(false)
  })

  return (
    <>
      <Tooltip content='Tạo' animation='duration-1000'>
        <div
          className={`w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer relative `}
          onClick={() => setIsShow(!isShow)}
          ref={childRef}
        >
          {isShow ? (
            <RiVideoAddFill className='w-5 h-5 text-white pointer-events-none ' />
          ) : (
            <RiVideoAddLine className='w-5 h-5 text-white pointer-events-none ' />
          )}
          {isShow && (
            <Dropdown className='w-[130px] h-[90px] bg-[#282828] text-white right-0 py-2'>
              {data?.map((item) => (
                <Link
                  to={item.path as string}
                  key={item.id}
                  className='flex flex-col hover:bg-[rgba(190,190,190,0.3)] '
                >
                  <div className='flex items-center justify-center gap-3 py-2'>
                    {item.icon}
                    <span className='text-xs font-medium'>{item.name}</span>
                  </div>
                </Link>
              ))}
            </Dropdown>
          )}
        </div>
      </Tooltip>
    </>
  )
}

export default CreateVideo
