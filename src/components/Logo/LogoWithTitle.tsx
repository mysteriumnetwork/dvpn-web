/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { LogoDarkIcon, LogoLightIcon } from '../Icons/Icons'

type Props = {
  readonly variant?: 'normal' | 'inverted'
  readonly className?: string
}

const ICON_STYLED = 'h-6 md:h-8 w-fit'

export const LogoWithTitle = ({ variant = 'normal', className }: Props) => {
  return (
    <div className={twMerge('flex items-center gap-1', className)}>
      {variant === 'inverted' && <LogoLightIcon className={ICON_STYLED} />}
      {variant === 'normal' && <LogoDarkIcon className={ICON_STYLED} />}
      <div className={twMerge('text-[22px] md:text-[26px]', variant === 'inverted' && 'text-white')}>
        <span className="font-medium">NODES</span>
      </div>
    </div>
  )
}

export default LogoWithTitle
