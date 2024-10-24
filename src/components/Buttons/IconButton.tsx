/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren, ReactNode } from 'react'

type Props = {
  readonly icon: ReactNode
  readonly onClick?: () => void
  readonly onBlur?: () => void
}

export const IconButton = ({ icon, onClick, onBlur, children }: PropsWithChildren<Props>) => {
  return (
    <button
      type="button"
      className="size-9 flex items-center justify-center relative rounded-full hover:cursor-pointer border-none bg-none"
      onBlur={() => onBlur && onBlur()}
      onClick={() => onClick && onClick()}
    >
      {icon}
      {children}
    </button>
  )
}

export default IconButton
