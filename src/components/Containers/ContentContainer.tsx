/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly wide?: boolean
  readonly className?: string
}

export const ContentContainer = ({ wide, className, children }: PropsWithChildren<Props>) => {
  return (
    <div
      className={twMerge(
        'px-5 w-full max-w-[585px] mx-auto pt-8 md:pt-12 pb-16 md:pb-24',
        wide && 'w-9/12 max-w-7xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default ContentContainer
