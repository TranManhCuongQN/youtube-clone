import 'babel-polyfill'
import { Tooltip } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useOuterClick } from '../../hook/useOutsideClick'
import Dropdown from '../Dropdown'
import ModalAdvanced from '../Modal/ModalAdvanced'
import { BsFillMicFill } from 'react-icons/bs'

const keyword = [
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

const SearchBar = () => {
  const [search, setSearch] = useState<string>('')
  const [record, setRecord] = useState<string>('')
  const [isDropdown, setIsDropdown] = useState<boolean>(false)
  const { transcript, listening } = useSpeechRecognition()
  const [isModal, setIsModal] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const childRef = useRef<HTMLDivElement | null>(null)

  const handleVoice = () => {
    SpeechRecognition.startListening({ language: 'vi-VN' })
    setIsModal(true)
    audioRef.current?.play()
  }

  useEffect(() => {
    setRecord(transcript)
  }, [transcript])

  useEffect(() => {
    const out = setTimeout(() => SpeechRecognition.stopListening(), 3000)
    if (listening === false && record !== '' && isModal !== false) {
      setIsModal(false)
      setSearch(record)
      audioRef.current?.play()
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
      <div className='flex items-center gap-x-5'>
        <div className='w-[700px] border-[#303030] h-12 rounded-2xl px-4 relative' ref={childRef}>
          <input
            type='text'
            className={
              isDropdown
                ? 'px-16 w-[605px] rounded-l-2xl h-full bg-[#121212] placeholder:font-semibold placeholder:text-[#888888] placeholder:text-lg shadow-lg absolute left-0 top-0 text-white border-[#303030]'
                : 'ml-12 w-[557px] rounded-l-2xl h-full bg-[#121212] placeholder:font-semibold placeholder:text-[#888888] placeholder:text-lg shadow-lg absolute left-0 top-0 text-white border-[#303030]'
            }
            placeholder={search ? '' : 'Tìm kiếm'}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => setIsDropdown(true)}
          />

          <>
            {' '}
            <button
              className={`absolute top-0 right-28 w-[20px] h-full  transition-all ${
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
                className='w-6 h-6 bg-[#121212] rounded-full hover:bg-[#a8a3a3]'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            {isDropdown && (
              <>
                <Dropdown
                  className='w-full h-[470px] bg-white text-black font-medium text-lg'
                  data={keyword}
                  search={isDropdown}
                />
                <div className='absolute top-0 left-6 w-[20px] h-full flex items-center z-50'>
                  {' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='bold'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='white'
                    className=' h-7 text-center w-full font-extrabold'
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

          <div
            className='absolute top-0 right-0 border border-[#303030] bg-[#222222] w-[94px] h-full rounded-r-2xl cursor-pointer flex items-center justify-center'
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
                  className=' h-7 text-center w-full'
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

        <Tooltip content='Tìm kiếm bằng giọng nói' animation='duration-1000'>
          <div
            className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'
            onClick={handleVoice}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='white'
              className='w-6 h-6 '
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
            SpeechRecognition.abortListening()
            setIsModal(false)
          }}
          bodyClassName='w-[800px]  rounded-xl relative z-50 bg-[#212121] shadow-lg'
        >
          <div className='h-96 flex flex-col px-5 justify-between py-10 relative'>
            <span
              className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer absolute top-2 right-2'
              onClick={() => {
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
                className='w-8 h-8'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </span>

            {transcript === '' ? (
              listening === true ? (
                <>
                  <span className='text-4xl text-white font-semibold'>Đang nghe ...</span>
                  <div className='w-16 h-16 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700'>
                    <BsFillMicFill className='w-6 h-6 text-white' />
                  </div>
                </>
              ) : (
                <>
                  <span className='text-4xl text-white font-semibold'>Tôi chưa nghe rõ. Mời bạn nói lại</span>
                  <div>
                    <div
                      className='w-20 h-20 rounded-full  flex items-center justify-center mx-auto bg-[#717171] cursor-pointer'
                      onClick={() => SpeechRecognition.startListening({ language: 'vi-VN' })}
                    >
                      <BsFillMicFill className='w-8 h-8 text-white' />
                    </div>
                    <div className='text-lg font-semibold text-[#638caa] py-5 text-center'>
                      Nhấn vào micrô để thử lại
                    </div>
                  </div>
                </>
              )
            ) : (
              <>
                {' '}
                <span className='text-3xl text-white font-semibold'>{transcript}</span>
                <div className='w-16 h-16 rounded-full  flex items-center justify-center mx-auto animate-ping bg-red-700'>
                  <BsFillMicFill className='w-6 h-6 text-white' />
                </div>
              </>
            )}
          </div>
        </ModalAdvanced>
        <audio
          src='https://res.cloudinary.com/dbekkzxtt/video/upload/v1677564641/tingting_sqvi6v.mp3?fbclid=IwAR3T6QhLIC6aciHf0B0YV2nhUjzoRo6iGux8ZEMv1q0tbG3ZVzXbyFzoCAc'
          ref={audioRef}
          className='opacity-0 hidden'
        />
      </div>
    </>
  )
}

export default SearchBar
