/**
 * --------------------------------------------------------------------------------------
 *
 * This file contains the Modal component and its subcomponents: Header, Body, and Footer.
 *
 * --------------------------------------------------------------------------------------
 */

/**
 * This is the Modal.Header component.
 * It is a wrapper for the modal header content.
 *
 * @param children - The content of the modal header.
 * @param className - Additional classes to apply to the modal header.
 * @param rest - Additional props to pass to the modal header.
 * @returns
 */
const Body = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  return (
    <div className={`p-6 ${className}`} {...rest}>
      {children}
    </div>
  )
}
Body.displayName = 'Body'
Modal.Body = Body

/**
 * This is the Modal component itself.
 * It is a wrapper for the Modal.Body, Modal.Header, Modal.Footer components.
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
  ...rest
}: {
  children: React.ReactNode
  className?: string
  superClassName?: string
  [key: string]: any
}) {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${superClassName}`}>
      <div className={`bg-white rounded-lg ${className}`} {...rest}>
        {children}
      </div>
    </div>
  )
}
