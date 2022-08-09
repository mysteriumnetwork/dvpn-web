/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InfoIcon, QuestionIcon } from '../Icons/Icons'
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
    font-size: ${themeCommon.fontSizeSmall};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.5);
    font-family: Ubuntu;
    font-weight: 400;
    border-radius: 10px;
    width: 250px;
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
  icon?: 'question' | 'info'
  content: ReactNode
  children?: ReactElement
  position?: 'top' | 'right' | 'bottom' | 'left'
  delayHideMs?: number
}

<<<<<<< HEAD
export const Tooltip = ({ icon = 'info', content, position = 'top', delayHideMs }: Props) => {
=======
export const Tooltip = ({ icon = 'info', content, position = 'top' }: Props) => {
>>>>>>> b27c05a25b050765e729ff42759608db483d1907
  const uid = useMemo(() => nanoid(), [])

  const Icon = useMemo(() => {
    switch (icon) {
      case 'info':
        return <InfoIcon data-for={uid} data-tip="" data-event="click" />
      case 'question':
        return <QuestionIcon data-for={uid} data-tip="" data-event="click" />
    }
  }, [])
  return (
    <>
      {Icon}
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
