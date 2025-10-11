/**
 * --------------------------------------------------------------------------------------
 *
 * This file contains the Modal component and its subcomponents: Header and Body.
 *
 * --------------------------------------------------------------------------------------
 */

import { IconX } from '@tabler/icons-react'
import React from 'react'

/**
 * This is the Modal.Header component.
 * It is a wrapper for the modal header content.
 *
 * @param children - The content of the modal header.
 * @param className - Additional classes to apply to the modal header.
 * @param rest - Additional props to pass to the modal header.
 * @returns
 */
interface ModalHeaderProps {
  children?: React.ReactNode
  className?: string
  noDefaultClose?: boolean
  onClose?: () => void
  [key: string]: unknown
}

const Header: React.FC<ModalHeaderProps> = ({
  children,
  className,
  noDefaultClose = false,
  onClose,
  ...rest
}) => {
  return (
    <div className={`p-3 relative ${className}`} {...rest}>
      {children}
      <IconX
        className={`absolute top-2 right-2 cursor-pointer ${noDefaultClose ? 'hidden' : ''}`}
        onClick={() => {
          onClose?.()
        }}
      />
    </div>
  )
}
Modal.Header = Header

/**
 * This is the Modal.Body component.
 * It is a wrapper for the modal header content.
 *
 * @param children - The content of the modal body.
 * @param className - Additional classes to apply to the modal body.
 * @param rest - Additional props to pass to the modal body.
 * @returns
 */
interface ModalBodyProps {
  children?: React.ReactNode
  className?: string
  [key: string]: unknown
}

const Body: React.FC<ModalBodyProps> = ({ children, className, ...rest }) => {
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  )
}
Modal.Body = Body

/**
 * This is the Modal component itself.
 * It is a wrapper for the Modal.Body, Modal.Header components.
 *
 * @param children - The content of the modal.
 * @param className - Additional classes to apply to the modal.
 * @param superClassName - Additional classes to apply to the modal wrapper. IDK, I made it for extra customizability.
 * @param rest - Additional props to pass to the modal.
 * @returns
 */
interface ModalProps {
  children: React.ReactNode
  className?: string
  superClassName?: string
  open?: boolean
  onClose?: () => void
  noHeader?: boolean
  doNotCloseOnClickOutside?: boolean
  [key: string]: unknown
}

export default function Modal({
  children,
  className,
  superClassName,
  open = true,
  onClose,
  noHeader = false,
  doNotCloseOnClickOutside = false,
  ...rest
}: ModalProps) {
  const safeOnClose = onClose ?? (() => {})
  const { head, body } = moveHeader(children, safeOnClose)
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          if (onClose && !doNotCloseOnClickOutside) {
            onClose()
          }
        }
      }}
      className={`fixed inset-0 flex items-center justify-center z-50 ${superClassName ?? ''} ${open ? '' : 'hidden'}`}
    >
      <div
        className={className ? `rounded-lg bg-white ${className}` : 'rounded-lg w-lg bg-white'}
        {...rest}
      >
        {!noHeader && head}
        {body}
      </div>
    </div>
  )
}

const moveHeader = (children: React.ReactNode, onClose: () => void) => {
  const headBase = (React.Children.toArray(children).find((child) => {
    return React.isValidElement(child) && child.type === Header
  }) as React.ReactElement<typeof Header & { onClose?: () => void }>) || <Header />

  const head = React.cloneElement(headBase, {
    onClose: onClose,
  })

  const body = React.Children.toArray(children).filter((child) => {
    return React.isValidElement(child) && child.type === Header ? false : true
  }) as React.ReactNode

  return { head, body }
}
