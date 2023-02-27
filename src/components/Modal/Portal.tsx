import { useEffect } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  containerClassName?: string
  bodyClassName?: string
  onClose?: () => void
  overlay?: boolean
  containerStyle?: React.CSSProperties
  bodyStyle?: React.CSSProperties
  children: React.ReactNode
  visible?: boolean
}

function createPortalWrapper() {
  const element = document.createElement('div')
  element.id = 'portal-wrapper'
  return element
}

const portalWrapperElm = createPortalWrapper()

const Portal = ({
  containerClassName = '',
  bodyClassName = '',
  onClose = () => {},
  overlay = true,
  containerStyle = {},
  bodyStyle = {},
  children
}: PortalProps) => {
  useEffect(() => {
    document.body.appendChild(portalWrapperElm)
  }, [])
  const renderContent = (
    <div className={containerClassName} style={containerStyle}>
      {overlay && <div className='absolute inset-0 bg-black overplay bg-opacity-20' onClick={onClose}></div>}

      <div className={bodyClassName} style={bodyStyle}>
        {children}
      </div>
    </div>
  )
  return createPortal(renderContent, portalWrapperElm)
}
export default Portal
