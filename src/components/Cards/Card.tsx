/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import Spinner from '../Spinner/Spinner'

export type CardProps = PropsWithChildren<{
  readonly id?: string
  readonly width?: number
  readonly height?: number
  readonly border?: boolean
  readonly fluid?: boolean
  readonly disabled?: boolean
  readonly className?: string
  readonly isLoading?: boolean
}>

export const Card = ({ id, border, fluid, width, height, disabled, className, isLoading, children }: CardProps) => {
  return (
    <div
      id={id}
      style={{ width: width, minHeight: height }}
      className={twMerge(
        'relative flex flex-col box-border p-5 rounded-3xl bg-white w-fit shadow-sm',
        border && 'border border-solid border-white-175',
        fluid && 'w-full h-full',
        disabled && 'bg-white-25',
        className,
      )}
    >
      {isLoading && (
        <div
          className={twMerge(
            'absolute z-[10000] bg-white/25 backdrop-blur-sm',
            'top-0 left-0 right-0 bottom-0 w-full h-full',
            'flex flex-col justify-center items-center',
            'rounded-3xl',
          )}
        >
          <Spinner size="3xl" />
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
