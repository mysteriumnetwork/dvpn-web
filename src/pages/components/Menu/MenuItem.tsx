/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { SvgProps } from '../../../components/Icons/Icons'

type Props = {
  readonly title: string
  readonly SvgIcon: React.FC<SvgProps>
  readonly path?: string
  readonly onClick?: () => void
  readonly active?: boolean
  readonly className?: string
}

export function MenuItem({ title, SvgIcon, path, onClick, active, className }: Props) {
  return (
    <NavLink
      className={twMerge(
        'flex items-center pl-5 md:pl-12 md:mr-3 lg:pl-16 lg:pr-0 gap-3 md:gap-5 py-2 md:rounded-r-full',
        active && 'md:bg-white',
        className,
      )}
      to={path || '#'}
      onClick={onClick}
    >
      <SvgIcon className="text-blue-475 size-8 min-w-8" />
      <div
        className={twMerge(
          'text-blue-850 text-base lg:text-lg font-bold',
          active && 'underline underline-offset-[12px] decoration-2 decoration-pink-525 md:no-underline',
        )}
      >
        {title}
      </div>
    </NavLink>
  )
}

export default MenuItem
