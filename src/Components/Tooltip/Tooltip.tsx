/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InfoIcon } from '../Icons/Icons'
import ReactTooltip from 'react-tooltip'
import React, { ReactElement, ReactNode, useMemo } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'

interface ReactTooltipStyledProps {
  $position?: 'top' | 'right' | 'bottom' | 'left'
}

// @ts-ignore
export const ReactTooltipStyled = styled(ReactTooltip)<ReactTooltipStyledProps>`
  &.type-dark.place-${({ $position }) => $position} {
    background-color: ${themeCommon.colorWhite};
    padding: 0.3rem 1rem;
    color: ${themeCommon.colorGrayBlue};
    font-size: ${themeCommon.fontSizeSmaller};
    font-weight: 400;
    border-radius: 10px;

    &:after {
      border-${({ $position }) => $position}-color: ${themeCommon.colorWhite};
    }

    opacity: 1 !important;
    
    pointer-events: auto !important;
    &:hover {
      visibility: visible !important;
      opacity: 1 !important;
    }
  }
`

interface Props {
  content: ReactNode
  children?: ReactElement
  position?: 'top' | 'right' | 'bottom' | 'left'
  delayHideMs?: number
}

export const Tooltip = ({ content, position = 'top', children, delayHideMs }: Props) => {
  const uid = useMemo(() => nanoid(), [])
  return (
    <>
      {children ? (
        React.cloneElement(children, { 'data-for': uid, 'data-tip': true })
      ) : (
        <InfoIcon data-for={uid} data-tip />
      )}
      <ReactTooltipStyled
        $position={position}
        delayHide={delayHideMs}
        globalEventOff="click"
        id={uid}
        place={position}
        getContent={() => content}
        effect="solid"
      />
    </>
  )
}
