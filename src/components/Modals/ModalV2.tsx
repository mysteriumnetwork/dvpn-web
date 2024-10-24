/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { XIcon } from '../Icons/Icons'
import { useKeyAction, useScrollLock } from '../../commons/hooks'

type Size = 'sm' | 'md' | 'lg'

type Props = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly title?: ReactNode
  readonly size?: Size
  readonly className?: string
  readonly children?: ReactNode
}

export const ModalV2 = ({ isOpen, onClose, title, size = 'md', className, children }: Props) => {
  useScrollLock(isOpen)
  useKeyAction({ key: 'Escape', action: onClose })

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 bottom-0 left-0 right-0 md:bg-white/25 md:backdrop-blur-sm z-50">
          <div className="relative w-full h-full flex flex-col justify-center items-center pt-[76px] md:pt-0">
            <div
              className={twMerge(
                'md:relative flex flex-col w-full bg-white-50 p-5 md:px-16 md:py-12 overflow-hidden',
                'md:border border-solid border-white-175 md:rounded-3xl h-full md:h-fit',
                size === 'sm' && 'md:w-[350px]',
                size === 'md' && 'md:w-[560px]',
                size === 'lg' && 'md:max-w-[720px]',
                className,
              )}
            >
              <div className="absolute flex justify-end top-[18px] md:top-5 right-[14px] bg-white md:bg-transparent w-28">
                <XIcon
                  className="cursor-pointer text-pink-525 p-1 size-10 bg-white md:bg-transparent"
                  onClick={onClose}
                />
              </div>
              {title && <div className="text-2xl font-bold text-blue-850 mb-6">{title}</div>}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalV2
