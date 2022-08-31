/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import { SessionV2 } from 'mysterium-vpn-js'
import location from '../../../commons/location'
import { alphaToHex, themeCommon } from '../../../theme/themeCommon'
import dates from '../../../commons/dates'
import { myst } from '../../../commons/mysts'
import bytes from '../../../commons/bytes'

const { format } = bytes
const { date2human, seconds2Time } = dates
const { countryName } = location
const session2human = (session: string) => {
  return session.split('-')[0]
}
const Body = styled.div`
  background-color: ${({ theme }) => theme.table.bgBody};
  border-radius: 30px;
  padding: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
`
const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: 1px dashed ${themeCommon.colorGrayBlue2 + alphaToHex(0.5)};
`
const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
`
const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  gap: 5px;
  :nth-of-type(even) {
    align-items: flex-end;
  }
`
const Name = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const Data = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-weight: 500;
`
const Left = styled.div`
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
`
const Right = styled.div`
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeBig};
  font-weight: 700;
`

interface Props {
  item: SessionV2
}

export const SessionCard = ({ item }: Props) => {
  return (
    <Body>
      <Header>
        <Left>{countryName(item.consumerCountry)}</Left>
        <Right>{session2human(item.id)}</Right>
      </Header>
      <Row>
        <Column>
          <Name>Started</Name>
          <Data>{date2human(item.startedAt)}</Data>
        </Column>
        <Column>
          <Name>Duration</Name>
          <Data>{seconds2Time(item.durationSeconds)}</Data>
        </Column>
      </Row>
      <Row>
        <Column>
          <Name>Earnings</Name>
          <Data>{myst.display(item.earnings.wei, { fractions: 3 })}</Data>
        </Column>
        <Column>
          <Name>Transferred</Name>
          <Data>{format(item.transferredBytes)}</Data>
        </Column>
      </Row>
    </Body>
  )
}
