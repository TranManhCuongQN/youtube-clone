import 'babel-polyfill'
import { Tooltip } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Dropdown from '../Dropdown'

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
  const [isDropdown, setIsDropdown] = useState<boolean>(false)
  const { transcript, listening, resetTranscript } = useSpeechRecognition()
  useEffect(() => {
    setSearch(transcript)
  }, [transcript])

  const handleVoice = () => {
    if (listening) {
      SpeechRecognition.stopListening()
      resetTranscript()
    } else {
      SpeechRecognition.startListening()
    }
  }

  return (
    <>
      <div className='flex items-center gap-x-5'>
        <div className='w-[700px] border-[2px] border-[#303030] h-12 rounded-2xl bg-[#121212] px-4 relative'>
          <input
            type='text'
            className='w-[600px] rounded-l-2xl h-full bg-[#121212] px-16 placeholder:font-semibold placeholder:text-[#888888] placeholder:text-lg shadow-lg absolute left-0 top-0 text-white border-[#303030]'
            placeholder={search ? '' : 'Tìm kiếm'}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onClick={() => setIsDropdown(true)}
          />

          <>
            {' '}
            <button
              className={`absolute top-0 right-28 w-[20px] h-full  transition-all ${
                search ? 'opacity-1 overflow-visible' : 'opacity-0 overflow-hidden'
              }`}
              onClick={() => setSearch('')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='white'
                className='w-6 h-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            {isDropdown && (
              <Dropdown
                className='w-full h-[470px] bg-white text-black font-medium text-lg'
                data={keyword}
                search={true}
              />
            )}
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

          <Tooltip content='Tìm kiếm'>
            <button
              className='absolute top-0 right-0 bg-[#222222] w-[94px] h-full rounded-r-2xl cursor-pointer'
              onClick={() => setIsDropdown(false)}
            >
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
        <Tooltip content='Tìm kiếm bằng giọng nói' animation='duration-1000'>
          <div className='w-12 h-12  rounded-full flex items-center justify-center hover:bg-[rgba(225,225,225,0.15)] cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='white'
              className='w-6 h-6 '
              onClick={handleVoice}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
              />
            </svg>
          </div>
        </Tooltip>
      </div>
    </>
  )
}

export default SearchBar
