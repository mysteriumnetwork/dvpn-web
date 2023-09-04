/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { themeCommon } from '../../theme/themeCommon'
import { devices } from '../../theme/themes'
import { ReactNode } from 'react'
import { InfoIcon } from '../Icons/Icons'
import { Tooltip } from '../Tooltip/Tooltip'
import * as React from 'react'

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  height: 40px;
  padding-right: 10px;
  min-width: fit-content;

  @media ${devices.tablet} {
    width: 100%;
    min-width: unset;
    padding: 4px;
  }
`

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  @media ${devices.tablet} {
    width: 30px;
    color: ${({ theme }) => theme.common.fontSizeSmall};
  }
`

const ToolTipIcon = styled(InfoIcon)`
  height: 10px;
  width: 10px;
`

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 10px;
  max-width: 10px;
`

interface Props {
  minWidth?: number
  title?: string
  content: ReactNode
  tooltip?: ReactNode
}

export const HeaderItem = ({ title, content, minWidth, tooltip }: Props) => {
  return (
    <Item style={minWidth ? { minWidth: `${minWidth}px` } : undefined}>
      {title && <Title>{title}</Title>}
      {content}
      {tooltip && (
        <>
          <div style={{ flexGrow: 1 }} />
          <TooltipContainer>
            <Tooltip content={tooltip}>
              <ToolTipIcon />
            </Tooltip>
          </TooltipContainer>
        </>
      )}
    </Item>
  )
}
