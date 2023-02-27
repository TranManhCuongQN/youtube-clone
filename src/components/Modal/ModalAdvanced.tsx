import React from 'react'
import ModalBase from './ModalBase'

interface ModalAdvancedProps {
  children: React.ReactNode
  visible: boolean
  onClose: () => void
  bodyClassName: string
}
const ModalAdvanced = ({ children, ...props }: ModalAdvancedProps) => {
  return <ModalBase {...props}>{children}</ModalBase>
}

export default ModalAdvanced
