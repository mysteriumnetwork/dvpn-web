/**
 * Copyright (c) 2024 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'
import { Link as RLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

type Props = PropsWithChildren<{
  readonly href?: string
  readonly onClick?: () => void
  readonly className?: string
  readonly ariaLabel?: string
  readonly target?: HTMLAttributeAnchorTarget
  readonly disabled?: boolean
}>

export const Link = ({ href, onClick, className, ariaLabel, target, disabled, children }: Props) => {
  const classes = twMerge(
    'no-underline transition-colors duration-200 w-fit',
    !disabled
      ? 'cursor-pointer text-pink-525 hover:text-pink-550 active:text-pink-575'
      : 'cursor-not-allowed text-gray-250',
    className,
  )

  const handleClick = !disabled ? onClick : undefined

  if (!href || disabled) {
    return (
      <span onClick={handleClick} className={classes} aria-disabled={disabled}>
        {children}
      </span>
    )
  }

  return onClick ? (
    <div className={classes} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </div>
  ) : (
    <RLink to={href} className={classes} aria-label={ariaLabel} target={target} rel="noopener noreferrer">
      {children}
    </RLink>
  )
}

export default Link
