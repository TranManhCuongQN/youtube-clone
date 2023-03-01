import { Tooltip } from 'flowbite-react'
import { useState, useRef, useEffect } from 'react'
import { AiOutlineYoutube } from 'react-icons/ai'
import { RiWirelessChargingFill, RiVideoAddFill, RiVideoAddLine } from 'react-icons/ri'
import Dropdown from '../Dropdown'
import { useOuterClick } from '../../hook/useOutsideClick'

const data = [
  {
    id: 1,
    name: 'Tải video lên',
    path: '/upload',
    icon: <AiOutlineYoutube className=' w-10 h-8 text-white' />
  },
  {
    id: 2,
    name: 'Phát trực tiếp',
    path: '/livestream',
    icon: <RiWirelessChargingFill className=' w-10 h-8 text-white' />
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
          className={`w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer relative`}
          onClick={() => setIsShow(!isShow)}
          ref={childRef}
        >
          {isShow ? (
            <RiVideoAddFill className='w-10 h-8 text-white pointer-events-none' />
          ) : (
            <RiVideoAddLine className='w-10 h-8 text-white pointer-events-none' />
          )}
          {isShow && (
            <Dropdown className='w-[220px] h-[118px] bg-[#282828] text-white left-0' data={data} createVideo={true} />
          )}
        </div>
      </Tooltip>
    </>
  )
}

export default CreateVideo
