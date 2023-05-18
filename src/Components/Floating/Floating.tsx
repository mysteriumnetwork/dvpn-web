/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {
  arrow,
  autoUpdate,
  offset,
  Placement,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions'
import { cloneElement, forwardRef, HTMLProps, isValidElement, useMemo, useRef, useState } from 'react'
import { mergeRefs } from 'react-merge-refs'
import styled from 'styled-components'

type FloatingState = ReturnType<typeof useFloatingState>
interface FloatingAnchorProps {
  state: FloatingState
  asChild?: boolean
}
interface FloatingBaseProps {
  state: FloatingState
}

interface FloatingStateProps {
  useArrow?: boolean
  clickable?: boolean
  initialOpen?: boolean
  placement?: Placement
  delay?: number | { open?: number; close?: number }
  id?: any
}
export const useFloatingState = ({
  initialOpen = false,
  clickable = false,
  useArrow = true,
  placement = 'top',
  delay = 50,
}: FloatingStateProps = {}) => {
  const [open, setOpen] = useState(initialOpen)
  const arrowRef = useRef(null)
  const data = useFloating({
    placement,
    open,
    onOpenChange: (open) => {
      setOpen(open)
    },
    whileElementsMounted: autoUpdate,
    //offset(distance) places tooltip away from anchor the given 'distance', based on placement
    middleware: [offset(10), shift(), arrow({ element: arrowRef })],
  })
  const { context } = data
  const hover = useHover(context, {
    move: true,
    delay: delay,
    restMs: 50,
  })

  const click = useClick(context)
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: clickable ? 'listbox' : 'tooltip' })
  const interactionPropList = clickable ? [focus, click, dismiss, role] : [hover, focus, dismiss, role]
  const interactions = useInteractions(interactionPropList)
  return useMemo(
    () => ({
      arrowRef,
      useArrow,
      open,
      setOpen,
      clickable,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  )
}

const Arrow = styled.div`
  position: absolute;
  background-color: inherit;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  box-shadow: inherit;
`
//Merges and forwards created state from useTooltipState to tooltip anchor component

const Anchor = forwardRef<HTMLElement, HTMLProps<HTMLElement> & FloatingAnchorProps>(
  ({ children, state, asChild, ...props }, propRef) => {
    const { reference, getReferenceProps } = state
    const ref = useMemo(() => mergeRefs([reference, propRef, (children as any).ref]), [reference, propRef, children])

    if (asChild && isValidElement(children)) {
      return cloneElement(
        children,
        getReferenceProps({
          ref,
          ...props,
          ...children.props,
        }),
      )
    }
    return (
      <div ref={ref} {...getReferenceProps(props)}>
        {children}
      </div>
    )
  },
)

//Merges and forwards created state from useTooltipState to tooltip base component
const Base = forwardRef<HTMLDivElement, HTMLProps<HTMLElement> & FloatingBaseProps>(({ state, ...props }, propRef) => {
  const { useArrow, placement, open, strategy, y, x, getFloatingProps, arrowRef, middlewareData, floating } = state
  const ref = useMemo(() => mergeRefs([floating, propRef]), [floating, propRef])
  const { x: arrowX, y: arrowY } = middlewareData.arrow ?? {}
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[placement.split('-')[0]]
  return (
    <>
      {open && (
        <div
          ref={ref}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0, ...props.style }}
          {...getFloatingProps(props)}
        >
          {props.children}
          {useArrow && (
            <Arrow
              ref={arrowRef}
              style={{
                top: arrowY != null ? `${arrowY}px` : '',
                left: arrowX != null ? `${arrowX}px` : '',
                right: '',
                [staticSide as string]: '-5px',
              }}
            />
          )}
        </div>
      )}
    </>
  )
})
export const Floating = {
  Base,
  Anchor,
  useFloatingState,
}
