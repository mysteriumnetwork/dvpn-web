/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InfoIcon, QuestionIcon } from '../Icons/Icons'
import ReactTooltip from 'react-tooltip'
import { ReactNode, useMemo } from 'react'
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
  }
`

interface Props {
  icon?: 'question' | 'info'
  content: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip = ({ icon = 'info', content, position = 'top' }: Props) => {
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
        globalEventOff="click"
        id={uid}
        place={position}
        getContent={() => content}
      />
    </>
  )
}
