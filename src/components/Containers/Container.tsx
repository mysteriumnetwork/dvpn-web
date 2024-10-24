/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  readonly noSidePadding?: boolean
  readonly className?: string
}

export const Container = ({ noSidePadding, className, children }: PropsWithChildren<Props>) => {
  return (
    <div className={className}>
      <div className={twMerge('max-w-[1920px] mx-auto', !noSidePadding && 'px-5 lg:px-10')}>{children}</div>
    </div>
  )
}

export default Container
