/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { StopwatchSimpleIcon } from '../../../../Components/Icons/Icons'
import { DoughnutChart } from './DoughnutChart'
import { Bubble } from '../../DashboardPage/Bubble'
import { alphaToHex, themeCommon } from '../../../../theme/themeCommon'
import { devices } from '../../../../theme/themes'
import { Media } from '../../../../commons/media'

const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text.colorMain};
`
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 90px;
  margin-bottom: 14px;
`

const Title = styled.div`
  font-size: ${themeCommon.fontSizeBig};
  font-weight: 700;
  font-style: normal;
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${themeCommon.fontSizeSmaller};
  color: ${({ theme }) => theme.text.colorSecondary};
`

const Content = styled.div`
  display: flex;
  align-items: center;
  @media ${devices.tablet} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`

const Column = styled.div<{ $marginLeft?: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-content: center;
  margin-left: ${({ $marginLeft }) => $marginLeft || '0'};
  @media ${devices.tablet} {
    height: 100%;
  }
`

const GreenBackground = styled.div`
  background: ${themeCommon.colorGreen}33;
  display: flex;
  border-radius: 15px;
  padding-right: 30px;
  padding-left: 30px;

  @media ${devices.tablet} {
    width: 100%;
    padding: 5px 30px;
  }
`

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;

  @media ${devices.tablet} {
    align-items: flex-start;
    padding: 5px 0;
  }
`

const SmallText = styled.div`
  font-weight: 400;
  font-size: ${themeCommon.fontSizeSmall};
  @media ${devices.tablet} {
    :nth-of-type(1) {
      margin-bottom: 10px;
    }
  }
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
        <Media.Desktop>
          <DoughnutChart
            data={statusData}
            colorA={themeCommon.colorBlue}
            colorB={`${themeCommon.colorBlue}${alphaToHex(0.2)}`}
          />
          <Column $marginLeft="40px">
            <Bubble value="30%" primary />
            <Bubble value="45%" />
          </Column>
          <Column $marginLeft="40px">
            <Bubble value="Online" color="green" line />
            <Bubble value="Offline" color="no-background" />
          </Column>
        </Media.Desktop>
        <Media.Mobile>
          <Row>
            <Column $marginLeft="30px">
              <DoughnutChart
                data={statusData}
                colorA={themeCommon.colorBlue}
                colorB={`${themeCommon.colorBlue}${alphaToHex(0.2)}`}
              />
            </Column>
            <Column $marginLeft="20px">
              <Bubble value="30%" primary />
              <Bubble value="45%" />
            </Column>
            <Column>
              <Bubble value="Offline" color="no-background" />
              <Bubble value="Online" color="green" line />
            </Column>
          </Row>
        </Media.Mobile>
        <Column $marginLeft="40px" />
        <GreenBackground>
          <Media.Desktop>
            <DoughnutChart
              data={idleData}
              colorA={themeCommon.colorGreen}
              colorB={`${themeCommon.colorGreen}${alphaToHex(0.2)}`}
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
          </Media.Desktop>
          <Media.Mobile>
            <Row>
              <Column>
                <DoughnutChart
                  data={idleData}
                  colorA={themeCommon.colorGreen}
                  colorB={`${themeCommon.colorGreen}${alphaToHex(0.2)}`}
                />
              </Column>
              <Column $marginLeft="20px">
                <Bubble value="30%" color="green" primary />
                <Bubble value="70%" color="green" />
              </Column>
              <Column $marginLeft="10px">
                <SmallText>Connected</SmallText>
                <SmallText>Idle</SmallText>
              </Column>
            </Row>
          </Media.Mobile>
        </GreenBackground>
      </Content>
    </Statistics>
  )
}
