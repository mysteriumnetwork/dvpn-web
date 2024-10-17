/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import Button from '../Buttons/Button'
import { useKeyAction, useScrollLock } from '../../commons/hooks'

type Props = {
  readonly isOpen: boolean
  readonly title?: ReactNode
  readonly message: ReactNode
  readonly onCancel?: () => void
  readonly cancelLabel?: string
  readonly onConfirm?: () => void
  readonly confirmLabel?: string
  readonly hideCancel?: boolean
  readonly hideConfirm?: boolean
  readonly className?: string
}

export const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  hideConfirm,
  hideCancel,
  className,
}: Props) => {
  useScrollLock(isOpen)
  useKeyAction({ key: 'Escape', action: onCancel })

  return (
    <>
      {isOpen && (
        <div className="fixed z-10 top-0 bottom-0 left-0 right-0 bg-white/25 backdrop-blur-sm">
          <div className="relative w-full h-full flex flex-col justify-center items-center">
            <div
              className={twMerge(
                'flex flex-col items-center justify-center w-full md:w-[560px] bg-white-50 z-40 p-5 md:p-8',
                'border border-solid border-white-175 rounded-2xl',
                className,
              )}
            >
              {title && <div className="text-2xl font-bold text-blue-850 mb-6">{title}</div>}
              <div className="text-sm text-center text-blue-850">{message}</div>
              <div className="flex gap-8 mt-8 mb-12 md:mb-0 w-full justify-center">
                {!hideConfirm && (
                  <Button
                    onClick={onConfirm}
                    label={confirmLabel ? confirmLabel : 'Confirm'}
                    size="sm"
                    fluid={hideCancel}
                    className="min-w-32"
                  />
                )}
                {!hideCancel && (
                  <Button
                    onClick={onCancel}
                    label={cancelLabel ? cancelLabel : 'Cancel'}
                    size="sm"
                    variant="secondary-outlined"
                    fluid={hideConfirm}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmationModal
