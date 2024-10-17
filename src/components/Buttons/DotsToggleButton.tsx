/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { twMerge } from 'tailwind-merge'

type Props = {
  isOpen: boolean
  onClick: () => void
}

export default function DotsToggleButton({ isOpen, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'flex flex-col justify-center items-center relative bg-white-150 size-9 min-w-9 rounded-full transition-all duration-500',
        isOpen && 'bg-opacity-0',
      )}
    >
      <span
        className={twMerge(
          'block transition-all duration-300 ease-out h-0.5 w-0.5 rounded-sm bg-blue-850',
          isOpen ? 'rotate-45 translate-y-1 bg-pink-525 h-px w-7' : '-translate-y-0.5',
        )}
      ></span>
      <span
        className={twMerge(
          'block transition-all duration-300 ease-out h-0.5 w-0.5 rounded-sm my-0.5 bg-blue-850',
          isOpen ? 'opacity-0' : 'opacity-100',
        )}
      ></span>
      <span
        className={twMerge(
          'block transition-all duration-300 ease-out h-0.5 w-0.5 rounded-sm bg-blue-850',
          isOpen ? '-rotate-45 -translate-y-1 bg-pink-525 h-px w-7' : 'translate-y-0.5',
        )}
      ></span>
    </button>
  )
}
