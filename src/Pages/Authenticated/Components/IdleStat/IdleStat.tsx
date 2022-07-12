/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import themes, { alphaToHex } from '../../../../commons/themes'
import { StopwatchSimpleIcon } from '../../../../Components/Icons/Icons'
import { DoughnutChart } from './DoughnutChart'
import { Bubble } from '../../DashboardPage/Bubble'

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colorTextMain};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 90px;
  margin-bottom: 14px;
`

const Title = styled.div`
  font-size: ${themes.common.fontSizeBig};
  font-weight: 700;
  font-style: normal;
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${themes.common.fontSizeSmaller};
  color: ${({ theme }) => theme.colorTextSecondary};
`

const Content = styled.div`
  display: flex;
  align-items: center;
`

const Column = styled.div<{ $marginLeft?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-content: center;
  margin-left: ${({ $marginLeft }) => $marginLeft || '0'};
`

const GreenBackground = styled.div`
  background: ${themes.common.colorGreen}33;
  display: flex;
  border-radius: 15px;
  padding-right: 30px;
  padding-left: 30px;
`

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
`

const SmallText = styled.div`
  font-weight: 400;
  font-size: ${themes.common.fontSizeSmall};
`

export const IdleStat = () => {
  const statusData = [
    {
      name: 'Online',
      value: 300,
    },
    {
      name: 'Offline',
      value: 700,
    },
  ]

  const idleData = [
    {
      name: 'Connected',
      value: 300,
    },
    {
      name: 'Idle',
      value: 700,
    },
  ]

  return (
    <Statistics>
      <Header>
        <Title>Statistics</Title>
        <SubTitle>
          Last 24 hours <StopwatchSimpleIcon />
        </SubTitle>
      </Header>

      <Content>
        <DoughnutChart
          data={statusData}
          colorA={themes.common.colorBlue}
          colorB={`${themes.common.colorBlue}${alphaToHex(0.2)}`}
        />
        <Column $marginLeft="40px">
          <Bubble value="30%" primary />
          <Bubble value="45%" />
        </Column>
        <Column $marginLeft="40px">
          <Bubble value="Online" color="green" />
          <Bubble value="Offline" color="no-background" />
        </Column>
        <Column $marginLeft="40px" />
        <GreenBackground>
          <DoughnutChart
            data={idleData}
            colorA={themes.common.colorGreen}
            colorB={`${themes.common.colorGreen}${alphaToHex(0.2)}`}
          />
          <Column $marginLeft="40px">
            <Row>
              <Bubble value="30%" color="green" primary />
              <SmallText>Connected</SmallText>
            </Row>
            <Row>
              <Bubble value="70%" color="green" />
              <SmallText>Idle</SmallText>
            </Row>
          </Column>
        </GreenBackground>
      </Content>
    </Statistics>
  )
}
