/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled, { useTheme } from 'styled-components'
import { devices } from '../../../../theme/themes'
import { StatGauge } from './StatGauge'
import { themeCommon } from '../../../../theme/themeCommon'
import { StopwatchSimpleIcon } from '../../../../Components/Icons/Icons'
import { useEffect, useState } from 'react'
import { tequila } from '../../../../api/tequila'
import errors from '../../../../commons/errors'

const Card = styled.div`
  background-color: ${({ theme }) => theme.activity.bgColor};
  border-radius: 20px;
  width: 100%;
  padding: 20px;
  color: ${({ theme }) => theme.text.colorMain};

  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
  margin-right: 60px;
  @media ${devices.laptopL} {
    width: 8em;
  }
`

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${themeCommon.fontSizeSmaller};
  color: ${({ theme }) => theme.text.colorSecondary};
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Content = styled.div`
  display: flex;
  align-items: center;

  @media ${devices.tablet} {
    flex-direction: column;
  }
`

export const Activity = () => {
  const { activity } = useTheme()
  const [online, setOnline] = useState(0)
  const [connected, setConnected] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const { activePercent, onlinePercent } = await tequila.api.provider.activity()

        setOnline(Math.round(onlinePercent))
        setConnected(Math.round(activePercent))
      } catch (err: any) {
        errors.parseToastError(err)
      }
    })()
  }, [])

  return (
    <Card>
      <Header>
        <Title>Statistics</Title>
        <SubTitle>
          Last 24 hours <StopwatchSimpleIcon />
        </SubTitle>
      </Header>
      <Content>
        <StatGauge
          progress={online}
          fill={activity.online.fill}
          bgColor={activity.online.bgColor}
          fillLabel="Online"
          bgLabel="Offline"
        />
        <StatGauge
          progress={connected}
          fill={activity.connectivity.bgColorA}
          bgColor={activity.connectivity.bgColorB}
          containerBgColor={activity.connectivity.bgColor}
          fillLabel="Connected"
          bgLabel="Idle"
        />
      </Content>
    </Card>
  )
}
