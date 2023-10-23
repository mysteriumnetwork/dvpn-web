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

const Item = styled.div<{ $variant?: Variant }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) => (props.$variant === 'progressBar' ? 'center' : 'flex-end')};
  width: 100%;
  gap: ${(props) => (props.$variant === 'bubble' ? '16px' : '6px')};
  height: 40px;
  min-width: 110px;
  @media ${devices.tablet} {
    justify-content: space-between;
    width: 100%;
    min-width: unset;
    padding-right: 0;
    gap: 4px;
  }
`

const Title = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  text-align: right;
  @media ${devices.tablet} {
    text-align: left;
    width: 40px;
    color: ${({ theme }) => theme.common.fontSizeSmall};
  }
`

const Content = styled.div<{ $variant?: Variant }>`
  margin-right: 10px;
  display: flex;
  height: 100%;
  align-items: center;
  width: 60%;
  width: ${(props) => (props.$variant === 'progressBar' ? '30%' : 'auto')};
  @media ${devices.tablet} {
    width: ${(props) => (props.$variant === 'bubble' ? 'auto' : '100%')};
    margin-right: 0;
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
  width: 10px;
  max-width: 10px;
  margin-left: 8px;
`

type Variant = 'default' | 'bubble' | 'progressBar'

interface Props {
  minWidth?: number
  title?: string
  content: ReactNode
  tooltip?: ReactNode
  variant?: Variant
}

export const HeaderItem = ({ title, variant = 'default', content, minWidth, tooltip }: Props) => {
  return (
    <Item $variant={variant} style={minWidth ? { minWidth: `${minWidth}px` } : undefined}>
      <Title>{title}</Title>
      <Content $variant={variant}>
        {content}
        {tooltip && (
          <TooltipContainer>
            <Tooltip content={tooltip}>
              <ToolTipIcon />
            </Tooltip>
          </TooltipContainer>
        )}
      </Content>
    </Item>
  )
}
