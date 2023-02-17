/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { mergeRefs } from 'react-merge-refs'
import {
  offset,
  Placement,
  useFloating,
  shift,
  useHover,
  useInteractions,
  autoUpdate,
  useFocus,
  useDismiss,
  useRole,
  arrow,
} from '@floating-ui/react-dom-interactions'
import { cloneElement, forwardRef, HTMLProps, isValidElement, ReactNode, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import zIndexes from '../../constants/z-indexes'

type TooltipState = ReturnType<typeof useTooltipState>
interface TooltipStateProps {
  initialOpen?: boolean
  placement?: Placement
  delay?: number | { open?: number; close?: number }
  id?: any
}

export const useTooltipState = ({ initialOpen = false, placement = 'top', id, delay = 50 }: TooltipStateProps = {}) => {
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
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const interactions = useInteractions([hover, focus, dismiss, role])
  return useMemo(
    () => ({
      arrowRef,
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  )
}
interface AnchorProps {
  state: TooltipState
  asChild?: boolean
}
//Merges and forwards created reference state from useTooltipState to tooltip anchor component
//If no component is passed as child, creates one
export const TooltipAnchor = forwardRef<HTMLElement, HTMLProps<HTMLElement> & AnchorProps>(
  ({ children, state, asChild, ...props }, propRef) => {
    const { reference, getReferenceProps } = state
    const ref = useMemo(() => mergeRefs([reference, propRef, (children as any).ref]), [reference, propRef, children])

    if (asChild && isValidElement(children)) {
      return cloneElement(children, getReferenceProps({ ref, ...props, ...children.props }))
    }
    return (
      <div ref={ref} {...getReferenceProps(props)}>
        {children}
      </div>
    )
  },
)
interface TooltipBaseProps {
  state: TooltipState
}
//Merges and forwards created state from useTooltipState to tooltip base component
export const TooltipBase = forwardRef<HTMLDivElement, HTMLProps<HTMLElement> & TooltipBaseProps>(
  ({ state, ...props }, propRef) => {
    const { placement, open, strategy, y, x, getFloatingProps, arrowRef, middlewareData, floating } = state
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
            <Arrow
              ref={arrowRef}
              style={{
                top: arrowY != null ? `${arrowY}px` : '',
                left: arrowX != null ? `${arrowX}px` : '',
                right: '',
                [staticSide as string]: '-5px',
              }}
            />
          </div>
        )}
      </>
    )
  },
)
interface TooltipProps {
  children: JSX.Element
  content: ReactNode
  placement?: Placement
  disabled?: boolean
  delay?: number | { open?: number; close?: number }
}

const StyledTooltip = styled(TooltipBase)`
  position: relative;
  background-color: ${({ theme }) => theme.tooltip.bg};
  box-shadow: ${({ theme }) => theme.tooltip.boxShadow};
  color: ${({ theme }) => theme.tooltip.textColor};
  padding: 10px;
  border-radius: 10px;
  font-weight: 400;
  line-height: 14px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  width: max-content;
  z-index: ${zIndexes.menuTooltip};
`
const Arrow = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.tooltip.bg};
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
`
export const Tooltip = ({ children, content, delay, disabled, placement = 'bottom' }: TooltipProps) => {
  const state = useTooltipState({ id: content, delay: delay, placement: placement })
  return (
    <>
      <TooltipAnchor state={state} asChild>
        {children}
      </TooltipAnchor>
      {!disabled && (
        <StyledTooltip data-test-id="Tooltip" state={state}>
          {content}
        </StyledTooltip>
      )}
    </>
  )
}
