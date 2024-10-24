/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import { Placement } from '@floating-ui/react-dom-interactions'
import { Floating } from '../Floating/Floating'

export type TooltipProps = {
  readonly children: JSX.Element
  readonly content: ReactNode
  readonly placement?: Placement
  readonly disabled?: boolean
  readonly delay?: number | { open?: number; close?: number }
}

export const Tooltip = ({ children, content, delay, disabled, placement = 'bottom' }: TooltipProps) => {
  const state = Floating.useFloatingState({ id: content, delay: delay, placement: placement })

  return (
    <>
      <Floating.Anchor state={state} asChild>
        {children}
      </Floating.Anchor>
      {!disabled && (
        <Floating.Base
          className="relative bg-white shadow text-purple-500 p-2.5 rounded-lg font-normal text-xs max-w-max z-[999]"
          state={state}
        >
          {content}
        </Floating.Base>
      )}
    </>
  )
}
