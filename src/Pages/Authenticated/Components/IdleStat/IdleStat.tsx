/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { css } from 'styled-components'
import themes from '../../../../commons/themes'
import { StopwatchSimpleIcon } from '../../../../Components/Icons/Icons'
import { DoughnutChart } from './DoughnutChart'

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${themes.current().colorDarkBlue};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 90px;
  margin-bottom: 14px;
`

const Title = styled.div`
  font-family: 'Ubuntu';
  font-size: ${themes.current().fontSizeBig};
  font-weight: 700;
  font-style: normal;
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Ubuntu';
  font-size: ${themes.current().fontSizeSmallest};
  color: ${themes.current().colorGrayBlue2};
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

interface BubbleProps {
  $primary?: boolean
}

const commonBubbleCss = css`
  display: flex;
  justify-content: center;
  border-radius: 12px;
  padding: 5px;
  font-weight: 700;
  font-family: Ubuntu;
  font-size: ${themes.current().fontSizeSmall};
`

const BlueBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) => ($primary ? themes.current().colorBlue : `${themes.current().colorBlue}33`)};
  color: ${({ $primary }) => ($primary ? themes.current().colorWhite : themes.current().colorDarkBlue)};
`

const GreenBubble = styled.div<BubbleProps>`
  ${commonBubbleCss};
  background: ${({ $primary }) => ($primary ? themes.current().colorGreen : `${themes.current().colorGreen}1a`)};
  color: ${({ $primary }) => ($primary ? themes.current().colorWhite : themes.current().colorDarkBlue)};
`

const NoBackgroundBubble = styled.div`
  ${commonBubbleCss};
  font-weight: 400 !important;
`

const GreenBackground = styled.div`
  background: ${themes.current().colorGreen}33;
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
  font-family: Ubuntu;
  font-weight: 400;
  font-size: ${themes.current().fontSizeSmall};
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
          colorA={themes.current().colorBlue}
          colorB={`${themes.current().colorBlue}33`}
        />
        <Column $marginLeft="40px">
          <BlueBubble $primary>30%</BlueBubble>
          <BlueBubble>30%</BlueBubble>
        </Column>
        <Column $marginLeft="40px">
          <GreenBubble>Online</GreenBubble>
          <NoBackgroundBubble>Offline</NoBackgroundBubble>
        </Column>
        <Column $marginLeft="40px" />
        <GreenBackground>
          <DoughnutChart
            data={idleData}
            colorA={themes.current().colorGreen}
            colorB={`${themes.current().colorGreen}33`}
          />
          <Column $marginLeft="40px">
            <Row>
              <GreenBubble $primary>30%</GreenBubble>
              <SmallText>Connected</SmallText>
            </Row>
            <Row>
              <GreenBubble>70%</GreenBubble>
              <SmallText>Idle</SmallText>
            </Row>
          </Column>
        </GreenBackground>
      </Content>
    </Statistics>
  )
}
