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
const Header = ({
  children,
  className,
  noDefaultClose = false,
  onClose,
  ...rest
}: {
  children?: React.ReactNode
  className?: string
  noDefaultClose?: boolean
  onClose?: () => void
  [key: string]: any
}) => {
  return (
    <div className={`p-3 relative ${className}`} {...rest}>
      {children}
      <IconX
        className={`absolute top-2 right-2 cursor-pointer ${noDefaultClose ? 'hidden' : ''}`}
        onClick={() => (onClose ? onClose() : {})}
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
const Body = ({
  children,
  className,
  ...rest
}: {
  children?: React.ReactNode
  className?: string
  [key: string]: any
}) => {
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
export default function Modal({
  children,
  className,
  superClassName,
  open = true,
  onClose,
  noHeader = false,
  doNotCloseOnClickOutside = false,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  superClassName?: string
  open?: boolean
  onClose?: () => void
  noHeader?: boolean
  doNotCloseOnClickOutside?: boolean
  [key: string]: any
}) {
  const { head, body } = moveHeader(children, onClose ? onClose : () => {})
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose && !doNotCloseOnClickOutside ? onClose() : {}
        }
      }}
      className={`fixed inset-0 flex items-center justify-center z-50 ${superClassName} ${open ? '' : 'hidden'}`}
    >
      <div className={`bg-white rounded-lg w-lg ${className}`} {...rest}>
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
