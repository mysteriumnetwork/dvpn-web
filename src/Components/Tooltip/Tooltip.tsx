/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { InfoIcon } from '../Icons/Icons'
import ReactTooltip from 'react-tooltip'
import { ReactNode, useMemo } from 'react'
import { nanoid } from 'nanoid'
import styled from 'styled-components'
import themes from '../../commons/themes'

interface ReactTooltipStyledProps {
  $position?: 'top' | 'right' | 'bottom' | 'left'
}

// @ts-ignore
export const ReactTooltipStyled = styled(ReactTooltip)<ReactTooltipStyledProps>`
  &.type-dark.place-${({ $position }) => $position} {
    background-color: ${themes.current().colorWhite};
    padding: 0.3rem 1rem;
    color: ${themes.current().colorGrayBlue};
    font-size: ${themes.current().fontSizeSmaller};
    font-family: Ubuntu;
    font-weight: 400;
    border-radius: 10px;

    &:after {
      border-${({ $position }) => $position}-color: ${themes.current().colorWhite};
    }
  }
`

interface Props {
  content: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
}

export const Tooltip = ({ content, position = 'top' }: Props) => {
  const uid = useMemo(() => nanoid(), [])
  return (
    <>
      <InfoIcon data-for={uid} data-tip="" data-event="click" />
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
