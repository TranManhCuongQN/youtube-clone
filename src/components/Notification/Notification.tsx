import { Tooltip } from 'flowbite-react'
import { AiOutlineBell, AiFillBell } from 'react-icons/ai'
import { useRef, useState } from 'react'
import Dropdown from '../Dropdown'
import { useOuterClick } from '../../hook/useOutsideClick'

const Notification = () => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const childRef = useRef<HTMLDivElement>(null)

  useOuterClick(childRef.current, () => {
    setIsShow(false)
  })

  return (
    <Tooltip content='Thông báo' animation='duration-1000'>
      <div
        className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer relative'
        onClick={() => setIsShow(!isShow)}
        ref={childRef}
      >
        {isShow ? (
          <AiFillBell className='w-8 h-8 text-white pointer-events-none' />
        ) : (
          <AiOutlineBell className='w-8 h-8 text-white pointer-events-none' />
        )}
        {isShow && (
          <>
            {' '}
            <Dropdown className='w-[430px] h-[500px] bg-[#282828] right-0' notification={true} />
          </>
        )}
      </div>
    </Tooltip>
  )
}

export default Notification
