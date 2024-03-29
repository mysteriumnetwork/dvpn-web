/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styled from 'styled-components'
import bytes from '../../../../commons/bytes'
import dates from '../../../../commons/dates'
import location from '../../../../commons/location'
import { Session } from 'mysterium-vpn-js'
import { myst } from '../../../../commons/mysts'
import { ReactComponent as Ongoing } from '../../../../assets/images/ongoing.svg'
import { alphaToHex, themeCommon } from '../../../../theme/themeCommon'

const { format, add } = bytes
const { date2human, seconds2Time } = dates
const { countryName } = location
const session2human = (session: string) => {
  return session.split('-')[0]
}

const Body = styled.div`
  background-color: ${({ theme }) => theme.table.bgBody};
  border-radius: 30px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const Header = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px 10px;
  border-radius: 10px;
  justify-content: space-between;
  width: 100%;
  background-color: ${themeCommon.colorGreen + alphaToHex(0.1)};
`
const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
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
  item: Session
}
export const LiveSessionCard = ({ item }: Props) => {
  return (
    <Body>
      <Header>
        <Left>{countryName(item.consumerCountry)}</Left>
        <Ongoing />
        <Right>{session2human(item.id)}</Right>
      </Header>
      <Row>
        <Column>
          <Name>Started</Name>
          <Data>{date2human(item.createdAt)}</Data>
        </Column>
        <Column>
          <Name>Duration</Name>
          <Data>{seconds2Time(item.duration)}</Data>
        </Column>
      </Row>
      <Row>
        <Column>
          <Name>Earnings</Name>
          <Data>{myst.display(item.tokens, { fractions: 3 })}</Data>
        </Column>
        <Column>
          <Name>Transferred</Name>
          <Data>{format(add(item.bytesReceived, item.bytesSent))}</Data>
        </Column>
      </Row>
    </Body>
  )
}
