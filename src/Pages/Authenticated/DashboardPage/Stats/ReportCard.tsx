/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { ReactNode } from 'react'
import styled from 'styled-components'
import { themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'

const Card = styled.div`
  display: flex;
  gap: 16px;
  background: ${({ theme }) => theme.bgLayoutCardCss};
  padding: 20px;
  color: ${({ theme }) => theme.text.colorMain};
  @media ${devices.tablet} {
    justify-content: space-between;
    padding: 20px 0px;
    align-items: center;
    margin: 0 20px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 150px;
`

const Value = styled.div`
  font-size: ${themeCommon.fontSizeHuge};
  font-weight: 700;
  color: ${({ theme }) => theme.text.colorMain};
`

const Title = styled.div`
  font-size: ${themeCommon.fontSizeSmall};
  font-weight: 400;
  color: ${({ theme }) => theme.text.colorSecondary};
`

/*const Meta = styled.div`
  display: flex;
  flex-direction: column;
`

interface DiffValueProps {
  positive: boolean
}*/
const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
/*const DiffValue = styled.div<DiffValueProps>`
  display: flex;
  justify-content: center;
  width: 80px;
  font-size: ${themeCommon.fontSizeNormal};
  padding: 4px 10px;
  border-radius: 100px;

  color: ${({ positive }) => (positive ? themeCommon.colorGreen : themeCommon.colorGrayBlue)};
  background: ${({ positive, theme }) => (positive ? theme.bgReportCardDiffPositive : themeCommon.colorLightBlue)};
`*/

interface Props {
  icon: ReactNode
  value: ReactNode
  title: string
  diff?: number
  tooltip?: ReactNode
}

export const ReportCard = ({ icon, value, title, tooltip, diff = 0 }: Props) => {
  return (
    <Card id="report-card">
      <IconContainer>{icon}</IconContainer>
      <Content>
        <Value>{value}</Value>
        <Title>{title}</Title>
      </Content>
      {/*<Meta>*/}
      {/*  <Tooltip content={tooltip}>*/}
      {/*    <DiffValue positive={diff > 0}>*/}
      {/*      {diff > 0 ? '+ ' : '- '}*/}
      {/*      {Math.abs(diff)}*/}
      {/*    </DiffValue>*/}
      {/*  </Tooltip>*/}
      {/*</Meta>*/}
    </Card>
  )
}
