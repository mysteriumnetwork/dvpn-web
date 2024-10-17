/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly className?: string
}

export function Sidebar({ className, children }: PropsWithChildren<Props>) {
  return (
    <div
      className={twMerge(
        'w-[260px] min-w-[260px] md:w-52 md:min-w-52 lg:w-60 lg:min-w-60 min-h-full text-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default Sidebar
