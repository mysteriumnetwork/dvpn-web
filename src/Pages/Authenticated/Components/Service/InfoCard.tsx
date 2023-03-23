/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ReactNode } from 'react'
import { themeCommon } from '../../../../theme/themeCommon'
import { Tooltip } from '../../../../Components/Tooltip/Tooltip'

const Card = styled.div`
  width: 100%;
`

const FlexContainer = styled.div`
  display: flex;
`

const Icon = styled.div`
  margin-right: 16px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Title = styled.div`
  font-family: 'Ubuntu', sans-serif;
  font-size: ${themeCommon.fontSizeSmall};
  color: ${({ theme }) => theme.text.colorSecondary}; ;
`
const Value = styled.div`
  font-size: ${themeCommon.fontSizeBigger};
  color: ${({ theme }) => theme.text.colorMain};
  font-style: normal;
`

interface InfoProps {
  title: string
  value: string
  icon?: ReactNode
  tooltip?: ReactNode
}

export const InfoCard = ({ title, value, icon, tooltip }: InfoProps) => {
  console.log(tooltip)
  return (
    <Card>
      <FlexContainer>
        {tooltip ? (
          <Tooltip content={tooltip}>
            <Icon>{icon && icon}</Icon>
          </Tooltip>
        ) : (
          <Icon>{icon && icon}</Icon>
        )}
        <Content>
          <Title>{title}</Title>
          <Value>{value}</Value>
        </Content>
      </FlexContainer>
    </Card>
  )
}
