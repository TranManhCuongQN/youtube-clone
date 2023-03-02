import { Children } from 'react'

interface DropdownProps {
  className?: string
  children: JSX.Element | JSX.Element[]
}
const Dropdown = (props: DropdownProps) => {
  const { className, children } = props

  return (
    <div className={`absolute top-[35px]  rounded-xl z-50 shadow-xl ${className} `}>
      <>
        {children}
        {/* {notification && (
         
          </div>
        )} */}
      </>
    </div>
  )
}

export default Dropdown
