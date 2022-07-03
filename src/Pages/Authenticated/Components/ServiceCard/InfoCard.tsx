/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { ReactNode } from 'react'
import themes from '../../../../commons/themes'

const Card = styled.div`
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
  font-size: ${themes.current().fontSizeSmall};
  color: ${themes.current().colorGrayBlue};
`
const Value = styled.div`
  font-size: ${themes.current().fontSizeNormal};
  font-style: normal;
`

interface InfoProps {
  title: string
  value: string
  icon?: ReactNode
}

export const InfoCard = ({ title, value, icon }: InfoProps) => {
  return (
    <Card>
      <Icon>{icon && icon}</Icon>
      <Content>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Content>
    </Card>
  )
}
