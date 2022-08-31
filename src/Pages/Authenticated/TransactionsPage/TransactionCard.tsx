/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Settlement } from 'mysterium-vpn-js'
import dates from '../../../commons/dates'
import styled from 'styled-components'
import { themeCommon, alphaToHex } from '../../../theme/themeCommon'
import { myst } from '../../../commons/mysts'
import { ReactComponent as Download } from '../../../assets/images/download.svg'
import { Tooltip } from '../../../Components/Tooltip/Tooltip'

const { date2human } = dates

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
  flex-direction: column;
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
const HeaderRow = styled(Row)`
  margin-top: 0;
  margin-bottom: 10px;
`
const Name = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const Data = styled.div`
  font-size: ${({ theme }) => theme.common.fontSizeNormal};
  color: ${({ theme }) => theme.table.mobileCard.textColorPrimary};
  font-weight: 500;
`
const Date = styled(Data)`
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
  color: ${({ theme }) => theme.table.mobileCard.textColorSecondary};
`
const Hash = styled(Data)`
  width: 100%;
  overflow: hidden;
  white-space: no-wrap;
  text-overflow: ellipsis;
`

const WideColumn = styled(Column)`
  width: 100%;
`
interface Props {
  item: Settlement
}
export const TransactionCard = ({ item }: Props) => {
  return (
    <Body>
      <Header>
        <HeaderRow>
          <Name>Transaction ID</Name>
          <Date>{date2human(item.settledAt)}</Date>
        </HeaderRow>
        <Hash>{item.txHash}</Hash>
      </Header>
      <Row>
        <WideColumn>
          <Name>External Wallet Address</Name>
          <Hash>{item.beneficiary}</Hash>
        </WideColumn>
      </Row>
      <Row>
        <Column>
          <Name>
            Received amount <Download />
          </Name>
          <Data>{myst.display(item.amount, { fractions: 3 })}</Data>
        </Column>
        <Column>
          <Name>
            Fees
            <Tooltip content="Fees include a 20% network fee and blockchain transaction fees for settlement transactions." />
          </Name>
          <Data>{myst.display(item.fees, { fractions: 3 })}</Data>
        </Column>
      </Row>
    </Body>
  )
}
