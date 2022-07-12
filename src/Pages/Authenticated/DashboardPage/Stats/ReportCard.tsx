/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import themes from '../../../../commons/themes'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  gap: 16px;
  background: ${({ theme }) => theme.bgLayoutCardCss};
  padding: 20px;
  color: ${({ theme }) => theme.colorTextMain};
}
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const Value = styled.div`
  font-size: ${themes.common.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.colorTextMain};
`

const Title = styled.div`
  font-size: ${themes.common.fontSizeSmall};
  font-weight: 400;
  color: ${({ theme }) => theme.colorTextSecondary};
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

interface DiffValueProps {
  positive: boolean
}

const DiffValue = styled.div<DiffValueProps>`
  display: flex;
  justify-content: center;
  width: 80px;
  font-size: ${themes.common.fontSizeNormal};
  padding: 4px 10px;
  border-radius: 100px;

  color: ${({ positive }) => (positive ? themes.common.colorGreen : themes.common.colorGrayBlue)};
  background: ${({ positive, theme }) => (positive ? theme.bgReportCardDiffPositive : themes.common.colorLightBlue)};
`

interface Props {
  icon: ReactNode
  value: ReactNode
  title: string
  diff?: number
  tooltip?: ReactNode
}

export const ReportCard = ({ icon, value, title, tooltip, diff = 0 }: Props) => {
  return (
    <Card>
      <div>{icon}</div>
      <Content>
        <Value>{value}</Value>
        <Title>{title}</Title>
      </Content>
      <Meta>
        <DiffValue positive={diff > 0}>
          {diff > 0 ? '+ ' : '- '}
          {Math.abs(diff)}
        </DiffValue>
      </Meta>
    </Card>
  )
}
