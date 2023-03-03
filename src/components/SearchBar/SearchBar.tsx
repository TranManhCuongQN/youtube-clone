import 'babel-polyfill'
import { Tooltip } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useOuterClick } from '../../hook/useOutsideClick'
import Dropdown from '../Dropdown'
import ModalAdvanced from '../Modal/ModalAdvanced'
import { BsFillMicFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RiHistoryLine } from 'react-icons/ri'

const keyword: { id: number; name: string }[] = [
  {
    id: 1,
    name: 'Em gái mưa'
  },
  {
    id: 2,
    name: 'TikTok'
  },
  {
    id: 3,
    name: 'Hoa hồng đỏ'
  },
  {
    id: 4,
    name: 'Khá Bảnh'
  },
  {
    id: 5,
    name: 'Giang hồ mạng'
  },
  {
    id: 6,
    name: 'Đội ngũ 86'
  },
  {
    id: 7,
    name: 'Gái Xinh'
  },
  {
    id: 8,
    name: 'Mern Stack'
  }
]

interface propType {
  handleSwitchMobie: () => void
  searchMobie?: boolean
}

const SearchBar = (props: propType) => {
  const { searchMobie, handleSwitchMobie } = props
  const [search, setSearch] = useState<string>('')
  const [record, setRecord] = useState<string>('')
  const [isDropdown, setIsDropdown] = useState<boolean>(false)
  const { transcript, listening } = useSpeechRecognition()
  const [isModal, setIsModal] = useState<boolean>(false)
  const audioStartRef = useRef<HTMLAudioElement | null>(null)
  const audioEndRef = useRef<HTMLAudioElement | null>(null)
  const audioCloseRef = useRef<HTMLAudioElement | null>(null)
  const [isProcess, setIsProcess] = useState<boolean>(false)
  const childRef = useRef<HTMLDivElement | null>(null)

  const handleVoice = () => {
    setIsModal(true)
    audioStartRef.current?.play()
    setIsProcess(true)
    SpeechRecognition.startListening({ language: 'vi-VN' })
  }

  useEffect(() => {
    setRecord(transcript)
  }, [transcript])

  useEffect(() => {
    const out = setTimeout(() => {
      if (record === '' && isModal && isProcess) audioEndRef.current?.play()
      SpeechRecognition.stopListening()
      setIsProcess(false)
    }, 3000)
    if (listening === false && record !== '' && isModal !== false) {
      setIsModal(false)
      setSearch(record)
      audioEndRef.current?.play()
    }
    return () => {
      clearTimeout(out)
    }
  }, [listening, record])

  useOuterClick(childRef.current, () => {
    setIsDropdown(false)
  })

  return (
    <>
      {searchMobie && (
        <>
          <div className='flex items-center justify-between h-15 bg-[#0f0f0f] sticky z-50 max-w-full px-2 py-2 gap-x-2'>
            <div
              className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'
              onClick={() => {
                handleSwitchMobie()
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='w-5 h-5 pointer-events-none'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18' />
              </svg>
            </div>

            <div className=' h-8 flex items-center w-[300px]' ref={childRef}>
              <div className='relative w-full'>
                <input
                  type='text'
                  className={` rounded-l-2xl h-8 bg-[#121212] placeholder:font-semibold placeholder:text-[#888888] placeholder:text-xs shadow-lg  text-white border-[#303030] border-1  w-full py-2 ${
                    search ? '' : 'pl-10'
                  }`}
                  placeholder={search ? '' : 'Tìm kiếm'}
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  onClick={() => setIsDropdown(true)}
                />

                <>
                  {' '}
                  <button
                    className={`absolute top-0 right-0 w-[20px] h-full  transition-all ${
                      search ? 'opacity-100 overflow-visible' : 'opacity-0 overflow-hidden'
                    }`}
                    onClick={() => setSearch('')}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='white'
                      className='w-4 h-4 bg-[#121212] rounded-full hover:bg-[#a8a3a3]'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                  {isDropdown && (
                    <>
                      <Dropdown className='left-0 w-full h-[360px] bg-white text-black font-medium text-lg'>
                        {keyword.map((item, index) => (
                          <Link to='/' key={item.id} className='flex flex-col px-2 py-2 my-2 hover:bg-gray-100'>
                            <div className='flex items-center justify-between'>
                              <div className='flex items-end gap-x-3'>
                                <RiHistoryLine className='w-5 h-5' />
                                <span className='text-xs font-medium'>{item.name}</span>
                              </div>
                              <span className='text-blue-700 text-xs hover:underline'>Xoá</span>
                            </div>
                          </Link>
                        ))}
                      </Dropdown>

                      <div className='absolute top-0 left-0 pl-3 h-full flex items-center z-50 '>
                        {' '}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='bold'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='white'
                          className='h-4  w-4'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </>
              </div>

              <div
                className=' border border-[#303030] bg-[#222222] w-[40px] h-full rounded-r-2xl cursor-pointer flex items-center justify-center  '
                onClick={() => setIsDropdown(false)}
              >
                <Tooltip content='Tìm kiếm'>
                  <button className='mt-1'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='white'
                      className=' h-5 text-center w-full'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                      />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>

            <Tooltip content='Tìm kiếm bằng giọng nói' animation='duration-1000' className='text-sm'>
              <div
                className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'
                onClick={handleVoice}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='white'
                  className='w-5 h-5 '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                  />
                </svg>
              </div>
            </Tooltip>

            {/* //*Modal */}
            <ModalAdvanced
              visible={isModal}
              onClose={() => {
                setIsModal(false)
                audioCloseRef.current?.play()
                SpeechRecognition.abortListening()
              }}
              bodyClassName='rounded-xl relative z-50 bg-[#212121] shadow-lg w-full mx-4'
            >
              <div className='h-70 flex flex-col px-3 justify-between py-3 relative w-full '>
                <span
                  className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer absolute top-2 right-2'
                  onClick={() => {
                    audioCloseRef.current?.play()
                    SpeechRecognition.abortListening()
                    setIsModal(false)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='white'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                  </svg>
                </span>

                {transcript === '' ? (
                  listening === true ? (
                    <>
                      <span className='text-base text-white font-semibold'>Đang nghe ...</span>
                      <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                        <BsFillMicFill className='w-5 h-5 text-white' />
                      </div>
                    </>
                  ) : isProcess ? (
                    <>
                      <span className='text-base text-white font-semibold'>Đang nghe ...</span>
                      <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                        <BsFillMicFill className='w-5 h-5 text-white' />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className='text-base text-white font-semibold mb-8'>Tôi chưa nghe rõ. Mời bạn nói lại</span>
                      <div>
                        <div
                          className='w-10 h-10 rounded-full flex items-center justify-center mx-auto bg-[#717171] cursor-pointer'
                          onClick={() => {
                            audioStartRef.current?.play()
                            SpeechRecognition.startListening({ language: 'vi-VN' })
                            setIsProcess(true)
                          }}
                        >
                          <BsFillMicFill className='w-5 h-5 text-white' />
                        </div>
                        <div className='text-sm font-semibold text-[#638caa] py-2 text-center'>
                          Nhấn vào micrô để thử lại
                        </div>
                      </div>
                    </>
                  )
                ) : (
                  <>
                    {' '}
                    <span className='text-base text-white font-semibold'>{transcript}</span>
                    <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                      <BsFillMicFill className='w-5 h-5 text-white' />
                    </div>
                  </>
                )}
              </div>
            </ModalAdvanced>
            <audio
              src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
              ref={audioStartRef}
              className='opacity-0 hidden'
            />
            <audio
              src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
              ref={audioEndRef}
              className='opacity-0 hidden '
            />
            <audio
              src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
              ref={audioCloseRef}
              className='opacity-0 hidden'
            />
          </div>
        </>
      )}

      {/* //* Responsive mobie */}
      {!searchMobie && (
        <div className='sm:hidden flex items-center'>
          <Tooltip content='Tìm kiếm'>
            <button
              className=' w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'
              onClick={() => {
                if (handleSwitchMobie) {
                  handleSwitchMobie()
                }
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className=' text-center w-full h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                />
              </svg>
            </button>
          </Tooltip>

          <Tooltip content='Tìm kiếm bằng giọng nói' animation='duration-1000'>
            <div
              className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'
              onClick={handleVoice}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='w-5 h-5 '
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
                />
              </svg>
            </div>
          </Tooltip>

          <ModalAdvanced
            visible={isModal}
            onClose={() => {
              setIsModal(false)
              audioCloseRef.current?.play()
              SpeechRecognition.abortListening()
            }}
            bodyClassName='rounded-xl relative z-50 bg-[#212121] shadow-lg w-full mx-4'
          >
            <div className='h-70 flex flex-col px-3 justify-between py-3 relative w-full '>
              <span
                className='w-8 h-8  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer absolute top-2 right-2'
                onClick={() => {
                  audioCloseRef.current?.play()
                  SpeechRecognition.abortListening()
                  setIsModal(false)
                }}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='white'
                  className='w-5 h-5'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              </span>

              {transcript === '' ? (
                listening === true ? (
                  <>
                    <span className='text-base text-white font-semibold'>Đang nghe ...</span>
                    <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                      <BsFillMicFill className='w-5 h-5 text-white' />
                    </div>
                  </>
                ) : isProcess ? (
                  <>
                    <span className='text-base text-white font-semibold'>Đang nghe ...</span>
                    <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                      <BsFillMicFill className='w-5 h-5 text-white' />
                    </div>
                  </>
                ) : (
                  <>
                    <span className='text-base text-white font-semibold mb-8'>Tôi chưa nghe rõ. Mời bạn nói lại</span>
                    <div>
                      <div
                        className='w-10 h-10 rounded-full flex items-center justify-center mx-auto bg-[#717171] cursor-pointer'
                        onClick={() => {
                          audioStartRef.current?.play()
                          SpeechRecognition.startListening({ language: 'vi-VN' })
                          setIsProcess(true)
                        }}
                      >
                        <BsFillMicFill className='w-5 h-5 text-white' />
                      </div>
                      <div className='text-sm font-semibold text-[#638caa] py-2 text-center'>
                        Nhấn vào micrô để thử lại
                      </div>
                    </div>
                  </>
                )
              ) : (
                <>
                  {' '}
                  <span className='text-base text-white font-semibold'>{transcript}</span>
                  <div className='w-8 h-8 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700 my-5'>
                    <BsFillMicFill className='w-5 h-5 text-white' />
                  </div>
                </>
              )}
            </div>
          </ModalAdvanced>
          <audio
            src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
            ref={audioStartRef}
            className='opacity-0 hidden'
          />
          <audio
            src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
            ref={audioEndRef}
            className='opacity-0 hidden '
          />
          <audio
            src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677591082/error-2-126514_rmyns3.mp3?fbclid=IwAR285bwo7xl9O4swZqKSv4muZDT9ddRc33_EZ27TnonknzlEcCzYLoaiaPc'
            ref={audioCloseRef}
            className='opacity-0 hidden'
          />
        </div>
      )}
    </>
  )
}

export default SearchBar
